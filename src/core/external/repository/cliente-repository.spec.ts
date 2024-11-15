import { Test, TestingModule } from '@nestjs/testing';
import { ClienteRepository } from './cliente-repository'; // Ajuste o caminho conforme necessário
import { Repository } from 'typeorm';
import { ClienteEntity } from './cliente.entity'; // Ajuste o caminho conforme necessário
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClienteRepository', () => {
  let clienteRepository: ClienteRepository;
  let mockRepository: Repository<ClienteEntity>;

  beforeEach(async () => {
    // Criando o mock do repositório TypeORM
    mockRepository = {
      findOneBy: jest.fn(),
      save: jest.fn(),
    } as any; // Usando "as any" para simular a interface do Repository

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ClienteRepository,
          useValue: new ClienteRepository(mockRepository), // instanciando manualmente a classe, passando mock do banco de dados
        },
        {
          provide: getRepositoryToken(ClienteEntity), // Para injecionar o mock no lugar do repositório real
          useValue: mockRepository,
        },
      ],
    }).compile();

    clienteRepository = module.get<ClienteRepository>(ClienteRepository);
  });

  describe('adquirirPorID', () => {
    it('Deve chamar o método findOneBy e retornar o cliente correto', async () => {
      const clienteMock = new ClienteEntity();
      clienteMock.id = 'cliente-id';
      clienteMock.nome = 'Cliente Teste';
      clienteMock.email = 'cliente@teste.com';
      clienteMock.cpf = '12345678900';

      // Mockando o retorno do método findOneBy
      (mockRepository.findOneBy as jest.Mock).mockResolvedValue(clienteMock);

      const result = await clienteRepository.adquirirPorID('cliente-id');

      // Verificando se o método foi chamado com o parâmetro correto
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        id: 'cliente-id',
      });

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });

  describe('adquirirPorEmail', () => {
    it('Deve chamar o método findOneBy e retornar o cliente correto', async () => {
      const clienteMock = new ClienteEntity();
      clienteMock.id = 'cliente-id';
      clienteMock.nome = 'Cliente Teste';
      clienteMock.email = 'cliente@teste.com';
      clienteMock.cpf = '12345678900';

      // Mockando o retorno do método findOneBy
      (mockRepository.findOneBy as jest.Mock).mockResolvedValue(clienteMock);

      const result =
        await clienteRepository.adquirirPorEmail('cliente@teste.com');

      // Verificando se o método foi chamado com o parâmetro correto
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        email: 'cliente@teste.com',
      });

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });

  describe('adquirirPorCPF', () => {
    it('Deve chamar o método findOneBy e retornar o cliente correto', async () => {
      const clienteMock = new ClienteEntity();
      clienteMock.id = 'cliente-id';
      clienteMock.nome = 'Cliente Teste';
      clienteMock.email = 'cliente@teste.com';
      clienteMock.cpf = '12345678900';

      // Mockando o retorno do método findOneBy
      (mockRepository.findOneBy as jest.Mock).mockResolvedValue(clienteMock);

      const result = await clienteRepository.adquirirPorCPF('12345678900');

      // Verificando se o método foi chamado com o parâmetro correto
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        cpf: '12345678900',
      });

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });

  describe('salvarCliente', () => {
    it('Deve chamar o método save e retornar o cliente salvo', async () => {
      const clienteMock = new ClienteEntity();
      clienteMock.id = 'cliente-id';
      clienteMock.nome = 'Cliente Teste';
      clienteMock.email = 'cliente@teste.com';
      clienteMock.cpf = '12345678900';

      // Mockando o retorno do método save
      (mockRepository.save as jest.Mock).mockResolvedValue(clienteMock);

      const result = await clienteRepository.salvarCliente(clienteMock);

      // Verificando se o método foi chamado com o parâmetro correto
      expect(mockRepository.save).toHaveBeenCalledWith(clienteMock);

      // Verificando se o resultado é o esperado
      expect(result).toEqual(clienteMock);
    });
  });
});
