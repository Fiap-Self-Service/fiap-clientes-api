// import { HttpException, HttpStatus } from '@nestjs/common';
// import { Cliente } from './cliente'; // Ajuste o caminho conforme necessário

// describe('Cliente', () => {
//   it('Deve lançar uma exceção se o nome for inválido', () => {
//     // Testando nome inválido (menor que 3 caracteres)
//     expect(() => new Cliente('Jo', 'teste@email.com', '12345678900')).toThrow(
//       new HttpException('Nome inválido', HttpStatus.BAD_REQUEST),
//     );

//     // Testando nome inválido (maior que 250 caracteres)
//     const nomeLongo = 'J'.repeat(251);
//     expect(
//       () => new Cliente(nomeLongo, 'teste@email.com', '12345678900'),
//     ).toThrow(new HttpException('Nome inválido', HttpStatus.BAD_REQUEST));
//   });

//   it('Deve lançar uma exceção se o e-mail for inválido', () => {
//     // Testando e-mail inválido (não segue o padrão)
//     expect(
//       () => new Cliente('Cliente Teste', 'emailinvalido', '12345678900'),
//     ).toThrow(new HttpException('e-mail inválido', HttpStatus.BAD_REQUEST));
//   });

//   it('Deve lançar uma exceção se o CPF for inválido', () => {
//     // Testando CPF inválido (menor que 11 caracteres)
//     expect(
//       () => new Cliente('Cliente Teste', 'teste@email.com', '123456789'),
//     ).toThrow(new HttpException('CPF inválido', HttpStatus.BAD_REQUEST));

//     // Testando CPF inválido (maior que 11 caracteres)
//     expect(
//       () => new Cliente('Cliente Teste', 'teste@email.com', '123456789012'),
//     ).toThrow(new HttpException('CPF inválido', HttpStatus.BAD_REQUEST));

//     // Testando CPF inválido (contém caracteres não numéricos)
//     expect(
//       () => new Cliente('Cliente Teste', 'teste@email.com', '1234A67890'),
//     ).toThrow(new HttpException('CPF inválido', HttpStatus.BAD_REQUEST));
//   });

//   it('Deve criar um cliente com dados válidos', () => {
//     const cliente = new Cliente(
//       'Cliente Teste',
//       'teste@email.com',
//       '12345678900',
//     );

//     // Verificando se a instância do cliente foi criada corretamente
//     expect(cliente).toBeInstanceOf(Cliente);
//     expect(cliente.nome).toBe('Cliente Teste');
//     expect(cliente.email).toBe('teste@email.com');
//     expect(cliente.cpf).toBe('12345678900');
//   });
// });
