import { Test, TestingModule } from '@nestjs/testing';
import { ClienteGateway } from './cliente-gateway';
import { IClienteRepository } from '../../external/repository/cliente-repository.interface';
import { Cliente } from '../../entities/cliente';

describe('ClienteGateway', () => {
  let clienteGateway: ClienteGateway;
  let clienteRepository: IClienteRepository;

  beforeEach(async () => {
    // Criando o mock do repositório
    const mockClienteRepository = {
      adquirirPorID: jest.fn(),
      adquirirPorEmail: jest.fn(),
      adquirirPorCPF: jest.fn(),
      salvarCliente: jest.fn(),
    };

    // Criando o módulo de teste e injetando as dependências mockadas
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteGateway,
        { provide: IClienteRepository, useValue: mockClienteRepository },
      ],
    }).compile();

    // Obtendo as instâncias do gateway e do repositório
    clienteGateway = module.get<ClienteGateway>(ClienteGateway);
    clienteRepository = module.get<IClienteRepository>(IClienteRepository);
  });

  describe('adquirirPorID', () => {
    it('Deve chamar o método adquirirPorID do repositório e retornar o cliente', async () => {
      const clienteMock: Cliente = {
        id: 'cliente-id',
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '12345678900',
      };

      // Mockando o comportamento do repositório
      (clienteRepository.adquirirPorID as jest.Mock).mockResolvedValue(
        clienteMock,
      );

      const result = await clienteGateway.adquirirPorID('cliente-id');

      // Verificando se o método foi chamado corretamente
      expect(clienteRepository.adquirirPorID).toHaveBeenCalledWith(
        'cliente-id',
      );

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });

  describe('adquirirPorEmail', () => {
    it('Deve chamar o método adquirirPorEmail do repositório e retornar o cliente', async () => {
      const clienteMock: Cliente = {
        id: 'cliente-id',
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '12345678900',
      };

      // Mockando o comportamento do repositório
      (clienteRepository.adquirirPorEmail as jest.Mock).mockResolvedValue(
        clienteMock,
      );

      const result = await clienteGateway.adquirirPorEmail('cliente@teste.com');

      // Verificando se o método foi chamado corretamente
      expect(clienteRepository.adquirirPorEmail).toHaveBeenCalledWith(
        'cliente@teste.com',
      );

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });

  describe('adquirirPorCPF', () => {
    it('Deve chamar o método adquirirPorCPF do repositório e retornar o cliente', async () => {
      const clienteMock: Cliente = {
        id: 'cliente-id',
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '12345678900',
      };

      // Mockando o comportamento do repositório
      (clienteRepository.adquirirPorCPF as jest.Mock).mockResolvedValue(
        clienteMock,
      );

      const result = await clienteGateway.adquirirPorCPF('12345678900');

      // Verificando se o método foi chamado corretamente
      expect(clienteRepository.adquirirPorCPF).toHaveBeenCalledWith(
        '12345678900',
      );

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });

  describe('salvarCliente', () => {
    it('Deve chamar o método salvarCliente do repositório e retornar o cliente salvo', async () => {
      const clienteMock: Cliente = {
        id: 'cliente-id',
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '12345678900',
      };

      // Mockando o comportamento do repositório
      (clienteRepository.salvarCliente as jest.Mock).mockResolvedValue(
        clienteMock,
      );

      const result = await clienteGateway.salvarCliente(clienteMock);

      // Verificando se o método foi chamado corretamente
      expect(clienteRepository.salvarCliente).toHaveBeenCalledWith(clienteMock);

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });
});
