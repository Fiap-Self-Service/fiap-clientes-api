import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente';
import { ClienteGateway } from '../adapters/gateways/cliente-gateway';

@Injectable()
export class ConsultarClientePorIDUseCase {
  async execute(clienteGateway: ClienteGateway, id: string): Promise<Cliente> {
    // verifica se esse CPF já foi cadastrado
    const cliente = await clienteGateway.adquirirPorID(id);

    if (!cliente) {
      throw new HttpException(
        'Cliente não encontrado.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return cliente;
  }
}
