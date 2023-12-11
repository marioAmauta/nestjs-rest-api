import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john.doe@email.com', role: 'ADMIN' },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@email.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Alice Williams',
      email: 'alice.williams@email.com',
      role: 'INTERN',
    },
    {
      id: 5,
      name: 'Charlie Brown',
      email: 'charlie.brown@email.com',
      role: 'ADMIN',
    },
    { id: 6, name: 'Eva Davis', email: 'eva.davis@email.com', role: 'INTERN' },
    {
      id: 7,
      name: 'Frank Miller',
      email: 'frank.miller@email.com',
      role: 'ENGINEER',
    },
    { id: 8, name: 'Grace Lee', email: 'grace.lee@email.com', role: 'INTERN' },
    {
      id: 9,
      name: 'Henry Wilson',
      email: 'henry.wilson@email.com',
      role: 'ADMIN',
    },
    {
      id: 10,
      name: 'Ivy Thomas',
      email: 'ivy.thomas@email.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0) {
        throw new NotFoundException('User Role Not Found');
      }

      return rolesArray;
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHightestId = [...this.users].sort((a, b) => b.id - a.id);

    const newUser = {
      id: usersByHightestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }

      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
