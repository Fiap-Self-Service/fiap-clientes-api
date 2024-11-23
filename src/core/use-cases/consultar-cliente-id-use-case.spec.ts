import { Test, TestingModule } from '@nestjs/testing';
import { ConsultarClientePorIDUseCase } from './consultar-cliente-id-use-case'; // Ajuste o caminho conforme necessário
import { ClienteGateway } from '../adapters/gateways/cliente-gateway'; // Ajuste o caminho conforme necessário
import { HttpException, HttpStatus } from '@nestjs/common';
import { Cliente } from '../entities/cliente'; // Ajuste o caminho conforme necessário
import { randomUUID } from 'crypto';

describe('ConsultarClientePorIDUseCase', () => {
  let consultarClientePorIDUseCase: ConsultarClientePorIDUseCase;
  let clienteGatewayMock: ClienteGateway;

  beforeEach(async () => {
    // Mockando o ClienteGateway
    clienteGatewayMock = {
      adquirirPorID: jest.fn(),
    } as any; // Mockando a interface ClienteGateway

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultarClientePorIDUseCase,
        {
          provide: ClienteGateway,
          useValue: clienteGatewayMock,
        },
      ],
    }).compile();

    consultarClientePorIDUseCase = module.get<ConsultarClientePorIDUseCase>(
      ConsultarClientePorIDUseCase,
    );
  });

  describe('execute', () => {
    it('Deve lançar uma exceção se o cliente não for encontrado', async () => {
      const id = randomUUID();

      // Mockando a resposta do ClienteGateway para indicar que o cliente não foi encontrado
      (clienteGatewayMock.adquirirPorID as jest.Mock).mockResolvedValue(null); // id não encontrado

      // Espera-se que a exceção seja lançada
      await expect(
        consultarClientePorIDUseCase.execute(clienteGatewayMock, id),
      ).rejects.toThrowError(
        new HttpException('Cliente não encontrado.', HttpStatus.BAD_REQUEST),
      );
    });

    it('Deve retornar o cliente se o ID for encontrado', async () => {
      const id = randomUUID();
      const clienteMock = new Cliente(
        'Cliente Teste',
        'teste@cliente.com',
        '12345678900',
      );

      clienteMock.id = id;

      // Mockando a resposta do ClienteGateway para indicar que o cliente foi encontrado
      (clienteGatewayMock.adquirirPorID as jest.Mock).mockResolvedValue(
        clienteMock,
      ); // id encontrado

      const result = await consultarClientePorIDUseCase.execute(
        clienteGatewayMock,
        id,
      );

      // Verificando se o método adquirirPorID foi chamado com o CPF correto
      expect(clienteGatewayMock.adquirirPorID).toHaveBeenCalledWith(id);

      // Verificando se o cliente retornado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });
});
