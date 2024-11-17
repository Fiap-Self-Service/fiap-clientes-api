// import { Test, TestingModule } from '@nestjs/testing';
// import { CadastrarClienteController } from './cadastrar-cliente-controller'; // Ajuste o caminho conforme necessário
// import { CadastrarClienteUseCase } from '../../use-cases/cadastrar-cliente-use-case'; // Ajuste o caminho conforme necessário
// import { ClienteGateway } from '../gateways/cliente-gateway'; // Ajuste o caminho conforme necessário
// import { ClienteDTO } from '../../dto/clienteDTO'; // Ajuste o caminho conforme necessário

// describe('CadastrarClienteController', () => {
//   let cadastrarClienteController: CadastrarClienteController;
//   let cadastrarClienteUseCase: CadastrarClienteUseCase;
//   let clienteGateway: ClienteGateway;

//   beforeEach(async () => {
//     // Criando mocks para as dependências
//     const mockCadastrarClienteUseCase = {
//       execute: jest.fn(), // Mock do método execute
//     };

//     const mockClienteGateway = {};

//     // Criando o módulo de teste e injetando as dependências mockadas
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         CadastrarClienteController,
//         {
//           provide: CadastrarClienteUseCase,
//           useValue: mockCadastrarClienteUseCase,
//         },
//         { provide: ClienteGateway, useValue: mockClienteGateway },
//       ],
//     }).compile();

//     // Obtendo a instância do controller
//     cadastrarClienteController = module.get<CadastrarClienteController>(
//       CadastrarClienteController,
//     );
//     cadastrarClienteUseCase = module.get<CadastrarClienteUseCase>(
//       CadastrarClienteUseCase,
//     );
//     clienteGateway = module.get<ClienteGateway>(ClienteGateway);
//   });

//   describe('execute', () => {
//     it('Deve chamar o CadastrarClienteUseCase e retornar o ClienteDTO correto', async () => {
//       // Preparando os dados de entrada e o resultado esperado
//       const clienteDTO: ClienteDTO = {
//         nome: 'Cliente Teste',
//         email: 'cliente@teste.com',
//         cpf: '12345678900',
//         id: null, // Inicialmente, sem ID
//       };

//       const clienteResult: ClienteDTO = {
//         nome: 'Cliente Teste',
//         email: 'cliente@teste.com',
//         cpf: '12345678900',
//         id: 'novo-id-gerado', // ID gerado após o cadastro
//       };

//       // Mockando o retorno do CadastrarClienteUseCase
//       (cadastrarClienteUseCase.execute as jest.Mock).mockResolvedValue(
//         clienteResult,
//       );

//       // Chamar o método execute do controller
//       const result = await cadastrarClienteController.execute(clienteDTO);

//       // Verificando se o método execute foi chamado corretamente
//       expect(cadastrarClienteUseCase.execute).toHaveBeenCalledWith(
//         clienteGateway,
//         clienteDTO,
//       );

//       // Verificando se o resultado do método execute do controller é o esperado
//       expect(result).toEqual(clienteResult);
//     });
//   });
// });
