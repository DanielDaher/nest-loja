import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressDAO } from './dao/address.dao';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateNewAddressDto } from './dto/create-address.dto';
import { UserService } from '../user/user.service';
import { Pagination } from 'src/shared/value-objects/pagination/pagination';
import ErrorMessages from 'src/errors/error-messages';

@Injectable()
export class AddressService {
  constructor(
    private addressDAO: AddressDAO,
    private userService: UserService,
  ) {}

  async create(data: CreateNewAddressDto) {
    const { userId } = data;

    await this.userService.findOne(userId);

    const newAddress = await this.addressDAO.create(data);
    return newAddress;
  }

  async findAll(size?: number, page?: number, search?: string) {
    const addresses = await this.addressDAO.findAll(size, page, search);

    return new Pagination(addresses, page, size).getResult();
  }

  async findOne(id: number) {
    const address = await this.addressDAO.findById(id);

    if (!address) {
      throw new NotFoundException(ErrorMessages.ADDRESS_NOT_FOUND);
    }

    return address;
  }

  async update(id: number, data: UpdateAddressDto) {
    const { userId } = data;

    if (userId) {
      await this.userService.findOne(userId);
    }

    await this.findOne(id);

    const updatedAddress = await this.addressDAO.update(id, data);
    return updatedAddress;
  }

  async remove(id: number) {
    const address = await this.findOne(id);

    return await this.addressDAO.remove(address.id);
  }
}
