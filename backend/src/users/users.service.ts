import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Create User (Signup)
  async createUser(username: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  // Validate User (Login)
  async validateUser(username: string, password: string): Promise<User> {
    // Fetch user from the database
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return user; // Return the validated user
  }
}
