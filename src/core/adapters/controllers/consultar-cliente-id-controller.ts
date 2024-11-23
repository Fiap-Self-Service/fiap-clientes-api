import { Injectable } from '@nestjs/common';
import { ClienteGateway } from '../gateways/cliente-gateway';
import { ConsultarClientePorIDUseCase } from '../../use-cases/consultar-cliente-id-use-case';
import { ClienteDTO } from '../../dto/clienteDTO';

@Injectable()
export class ConsultarClientePorIDController {
  constructor(
    private readonly clienteGateway: ClienteGateway,
    private readonly consultarClientePorIDUseCase: ConsultarClientePorIDUseCase,
  ) {}

  async execute(cpf: string): Promise<ClienteDTO> {
    const cliente = await this.consultarClientePorIDUseCase.execute(
      this.clienteGateway,
      cpf,
    );
    const adapterPresenter: ClienteDTO = { ...cliente };

    return adapterPresenter;
  }
}
