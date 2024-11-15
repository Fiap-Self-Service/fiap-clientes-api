import { Test, TestingModule } from '@nestjs/testing';
import { ClienteAPIController } from './cliente-api.controller';
import { CadastrarClienteController } from '../../adapters/controllers/cadastrar-cliente-controller';
import { ConsultarClientePorCPFController } from '../../adapters/controllers/consultar-cliente-controller';
import { ClienteDTO } from '../../dto/clienteDTO';
import { randomUUID } from 'crypto';

describe('ClienteAPIController', () => {
  let clienteAPIController: ClienteAPIController;
  let cadastrarClienteController: CadastrarClienteController;
  let consultarClientePorCPFController: ConsultarClientePorCPFController;

  beforeEach(async () => {
    // Mockando as dependências (CadastrarClienteController e ConsultarClientePorCPFController)
    const mockCadastrarClienteController = {
      execute: jest.fn(), // Mock do método execute
    };

    const mockConsultarClientePorCPFController = {
      execute: jest.fn(), // Mock do método execute
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ClienteAPIController],
      providers: [
        {
          provide: CadastrarClienteController,
          useValue: mockCadastrarClienteController,
        },
        {
          provide: ConsultarClientePorCPFController,
          useValue: mockConsultarClientePorCPFController,
        },
      ],
    }).compile();

    // Obter as instâncias dos controladores
    clienteAPIController = moduleRef.get(ClienteAPIController);
    cadastrarClienteController = moduleRef.get(CadastrarClienteController);
    consultarClientePorCPFController = moduleRef.get(
      ConsultarClientePorCPFController,
    );
  });

  describe('cadastrarCliente', () => {
    it('Deve cadastrar um cliente com sucesso', async () => {
      // Definir o comportamento do mock
      const clienteDTO: ClienteDTO = {
        nome: 'Cliente XPTO',
        email: 'seuemail@email.com',
        cpf: '70234146060',
        id: null,
      };

      const resultadoMock: ClienteDTO = {
        nome: 'Cliente XPTO',
        email: 'seuemail@email.com',
        cpf: '70234146060',
        id: randomUUID(),
      };

      // Simular o retorno do método execute
      jest
        .spyOn(cadastrarClienteController, 'execute')
        .mockImplementation(async () => resultadoMock);

      // Executar a ação
      const resultado = await clienteAPIController.cadastrarCliente(clienteDTO);

      // Validar o comportamento
      expect(resultado).toBe(resultadoMock);
      expect(cadastrarClienteController.execute).toHaveBeenCalledWith(
        clienteDTO,
      ); // Verifica se o método foi chamado com os dados corretos
    });
  });

  describe('buscarClientePorCPF', () => {
    it('Deve buscar um cliente por CPF', async () => {
      // Definir o comportamento do mock
      const cpf = '70234146060';
      const clienteMock = {
        id: randomUUID(),
        nome: 'Cliente XPTO',
        email: 'seuemail@email.com',
        cpf: cpf,
      };

      // Simular o retorno do método execute
      jest
        .spyOn(consultarClientePorCPFController, 'execute')
        .mockImplementation(async () => clienteMock);

      // Executar a ação
      const resultado = await clienteAPIController.buscarClientePorCPF(cpf);

      // Validar o comportamento
      expect(resultado).toBe(clienteMock);
      expect(consultarClientePorCPFController.execute).toHaveBeenCalledWith(
        cpf,
      ); // Verifica se o método foi chamado com o CPF correto
    });
  });
});
