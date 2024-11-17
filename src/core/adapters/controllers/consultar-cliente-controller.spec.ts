// import { Test, TestingModule } from '@nestjs/testing';
// import { ConsultarClientePorCPFController } from './consultar-cliente-controller'; // Ajuste o caminho conforme necessário
// import { ConsultarClientePorCPFUseCase } from '../../use-cases/consultar-cliente-cpf-use-case'; // Ajuste o caminho conforme necessário
// import { ClienteGateway } from '../gateways/cliente-gateway'; // Ajuste o caminho conforme necessário
// import { ClienteDTO } from '../../dto/clienteDTO'; // Ajuste o caminho conforme necessário

// describe('ConsultarClientePorCPFController', () => {
//   let consultarClientePorCPFController: ConsultarClientePorCPFController;
//   let consultarClientePorCPFUseCase: ConsultarClientePorCPFUseCase;
//   let clienteGateway: ClienteGateway;

//   beforeEach(async () => {
//     // Criando mocks para as dependências
//     const mockConsultarClientePorCPFUseCase = {
//       execute: jest.fn(), // Mock do método execute
//     };

//     const mockClienteGateway = {}; // Não é necessário mockar nada do clienteGateway neste caso

//     // Criando o módulo de teste e injetando as dependências mockadas
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ConsultarClientePorCPFController,
//         {
//           provide: ConsultarClientePorCPFUseCase,
//           useValue: mockConsultarClientePorCPFUseCase,
//         },
//         { provide: ClienteGateway, useValue: mockClienteGateway },
//       ],
//     }).compile();

//     // Obtendo a instância do controller
//     consultarClientePorCPFController =
//       module.get<ConsultarClientePorCPFController>(
//         ConsultarClientePorCPFController,
//       );
//     consultarClientePorCPFUseCase = module.get<ConsultarClientePorCPFUseCase>(
//       ConsultarClientePorCPFUseCase,
//     );
//     clienteGateway = module.get<ClienteGateway>(ClienteGateway);
//   });

//   describe('execute', () => {
//     it('Deve chamar o ConsultarClientePorCPFUseCase e retornar o ClienteDTO correto', async () => {
//       // Preparando os dados de entrada e o resultado esperado
//       const cpf = '70234146060';
//       const clienteDTO: ClienteDTO = {
//         nome: 'Cliente Teste',
//         email: 'cliente@teste.com',
//         cpf: cpf,
//         id: 'cliente-id',
//       };

//       // Mockando o retorno do ConsultarClientePorCPFUseCase
//       (consultarClientePorCPFUseCase.execute as jest.Mock).mockResolvedValue(
//         clienteDTO,
//       );

//       // Chamando o método execute do controller
//       const result = await consultarClientePorCPFController.execute(cpf);

//       // Verificando se o método execute foi chamado corretamente
//       expect(consultarClientePorCPFUseCase.execute).toHaveBeenCalledWith(
//         clienteGateway,
//         cpf,
//       );

//       // Verificando se o resultado do método execute do controller é o esperado
//       expect(result).toEqual(clienteDTO);
//     });
//   });
// });
