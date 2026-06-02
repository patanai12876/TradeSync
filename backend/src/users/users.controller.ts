import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Registration Route
  @Post('register')
  async register(@Body() body: { username: string; email: string; password: string }) {
    console.log('Incoming request data:', body);
    const { username, email, password } = body;
    try {
      const user = await this.usersService.createUser(username, email, password);
      console.log('User created:', user);
      return { message: 'User registered successfully', user };
    } catch (error) {
      console.error('Error during user registration:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Login Route
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log('Login request data:', body);
    const { username, password } = body;
    try {
      const user = await this.usersService.validateUser(username, password);
      console.log('User validated:', user);
      return { message: 'Login successful', user };
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
