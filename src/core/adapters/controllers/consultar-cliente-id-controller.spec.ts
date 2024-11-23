import { Test, TestingModule } from '@nestjs/testing';
import { ConsultarClientePorIDController } from './consultar-cliente-id-controller';
import { ConsultarClientePorIDUseCase } from '../../use-cases/consultar-cliente-id-use-case';
import { ClienteGateway } from '../gateways/cliente-gateway';
import { ClienteDTO } from '../../dto/clienteDTO';
import { randomUUID } from 'crypto';

describe('ConsultarClientePorIDController', () => {
  let consultarClientePorIDController: ConsultarClientePorIDController;
  let consultarClientePorIDUseCase: ConsultarClientePorIDUseCase;
  let clienteGateway: ClienteGateway;

  beforeEach(async () => {
    // Criando mocks para as dependências
    const mockConsultarClientePorIDUseCase = {
      execute: jest.fn(), // Mock do método execute
    };

    const mockClienteGateway = {}; // Não é necessário mockar nada do clienteGateway neste caso

    // Criando o módulo de teste e injetando as dependências mockadas
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultarClientePorIDController,
        {
          provide: ConsultarClientePorIDUseCase,
          useValue: mockConsultarClientePorIDUseCase,
        },
        { provide: ClienteGateway, useValue: mockClienteGateway },
      ],
    }).compile();

    // Obtendo a instância do controller
    consultarClientePorIDController =
      module.get<ConsultarClientePorIDController>(
        ConsultarClientePorIDController,
      );
    consultarClientePorIDUseCase = module.get<ConsultarClientePorIDUseCase>(
      ConsultarClientePorIDUseCase,
    );
    clienteGateway = module.get<ClienteGateway>(ClienteGateway);
  });

  describe('execute', () => {
    it('Deve chamar o ConsultarClientePorIDUseCase e retornar o ClienteDTO correto', async () => {
      // Preparando os dados de entrada e o resultado esperado
      const id = randomUUID();
      const clienteDTO: ClienteDTO = {
        nome: 'Cliente Teste',
        email: 'cliente@teste.com',
        cpf: '70234146060',
        id: id,
      };

      // Mockando o retorno do ConsultarClientePorIDUseCase
      (consultarClientePorIDUseCase.execute as jest.Mock).mockResolvedValue(
        clienteDTO,
      );

      // Chamando o método execute do controller
      const result = await consultarClientePorIDController.execute(id);

      // Verificando se o método execute foi chamado corretamente
      expect(consultarClientePorIDUseCase.execute).toHaveBeenCalledWith(
        clienteGateway,
        id,
      );

      // Verificando se o resultado do método execute do controller é o esperado
      expect(result).toEqual(clienteDTO);
    });
  });
});
