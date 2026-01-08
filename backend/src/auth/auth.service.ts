import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async register(data: any) {
        const existing = await this.userRepository.findOne({
            where: { email: data.email }
        });

        if (existing) {
            throw new BadRequestException('Bu email zaten kullanılıyor');
        }

        const user = this.userRepository.create({
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role || 'customer', // ← role parametresi eklendi
        });

        await this.userRepository.save(user);

        const { password, ...result } = user;
        return result;
    }

    async login(data: any) {
        const user = await this.userRepository.findOne({
            where: {
                email: data.email,
                password: data.password,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Email veya şifre hatalı');
        }

        const { password, ...result } = user;
        return result;
    }
}