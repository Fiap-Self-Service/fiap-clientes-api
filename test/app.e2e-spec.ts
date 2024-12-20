import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

const CLIENTE1 = {
  nome: 'Cliente de Teste',
  email: 'cliente@teste.com',
  cpf: '70234146061',
  id: null,
};

describe('Testes de Integração', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Deve cadastrar Cliente', () => {
    return request(app.getHttpServer())
      .post('/clientes')
      .send(CLIENTE1)
      .expect(HttpStatus.CREATED);
  });

  it('Deve buscar os dados do cliente por CPF', async () => {
    await request(app.getHttpServer()).post('/clientes').send(CLIENTE1);

    return await request(app.getHttpServer())
      .get('/clientes/cpf/' + CLIENTE1.cpf)
      .send()
      .expect(HttpStatus.OK);
  });

  it('Deve buscar os dados do cliente por ID', async () => {
    const response = await request(app.getHttpServer())
      .post('/clientes')
      .send(CLIENTE1);

    return await request(app.getHttpServer())
      .get('/clientes/' + response.body.id)
      .send()
      .expect(HttpStatus.OK);
  });
});
