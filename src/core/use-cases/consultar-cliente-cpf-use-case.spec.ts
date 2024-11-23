import { Test, TestingModule } from '@nestjs/testing';
import { ConsultarClientePorCPFUseCase } from './consultar-cliente-cpf-use-case';
import { ClienteGateway } from '../adapters/gateways/cliente-gateway';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Cliente } from '../entities/cliente';

describe('ConsultarClientePorCPFUseCase', () => {
  let consultarClientePorCPFUseCase: ConsultarClientePorCPFUseCase;
  let clienteGatewayMock: ClienteGateway;

  beforeEach(async () => {
    // Mockando o ClienteGateway
    clienteGatewayMock = {
      adquirirPorCPF: jest.fn(),
    } as any; // Mockando a interface ClienteGateway

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultarClientePorCPFUseCase,
        {
          provide: ClienteGateway,
          useValue: clienteGatewayMock,
        },
      ],
    }).compile();

    consultarClientePorCPFUseCase = module.get<ConsultarClientePorCPFUseCase>(
      ConsultarClientePorCPFUseCase,
    );
  });

  describe('execute', () => {
    it('Deve lançar uma exceção se o cliente não for encontrado', async () => {
      const cpf = '123.456.789-00';

      // Mockando a resposta do ClienteGateway para indicar que o cliente não foi encontrado
      (clienteGatewayMock.adquirirPorCPF as jest.Mock).mockResolvedValue(null); // CPF não encontrado

      // Espera-se que a exceção seja lançada
      await expect(
        consultarClientePorCPFUseCase.execute(clienteGatewayMock, cpf),
      ).rejects.toThrowError(
        new HttpException('Cliente não encontrado.', HttpStatus.BAD_REQUEST),
      );
    });

    it('Deve retornar o cliente se o CPF for encontrado', async () => {
      const cpf = '123.456.789-00';
      const clienteMock = new Cliente(
        'Cliente Teste',
        'teste@cliente.com',
        '12345678900',
      );

      // Mockando a resposta do ClienteGateway para indicar que o cliente foi encontrado
      (clienteGatewayMock.adquirirPorCPF as jest.Mock).mockResolvedValue(
        clienteMock,
      ); // CPF encontrado

      const result = await consultarClientePorCPFUseCase.execute(
        clienteGatewayMock,
        cpf,
      );

      // Verificando se o método adquirirPorCPF foi chamado com o CPF correto
      expect(clienteGatewayMock.adquirirPorCPF).toHaveBeenCalledWith(
        '12345678900',
      );

      // Verificando se o cliente retornado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });
});
