import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './infrastructure/health/health.module';
import { ClienteGateway } from './core/adapters/gateways/cliente-gateway';
import { ConsultarClientePorCPFController } from './core/adapters/controllers/consultar-cliente-controller';
import { CadastrarClienteController } from './core/adapters/controllers/cadastrar-cliente-controller';
import { CadastrarClienteUseCase } from './core/use-cases/cadastrar-cliente-use-case';
import { ConsultarClientePorCPFUseCase } from './core/use-cases/consultar-cliente-cpf-use-case';
import { IClienteRepository } from './core/external/repository/cliente-repository.interface';
import { ClienteRepository } from './core/external/repository/cliente-repository';
import { DataSource } from 'typeorm';
import { ClienteEntity } from './core/external/repository/cliente.entity';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ClienteAPIController } from './core/external/api/cliente-api.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HealthModule,
    DatabaseModule,
  ],
  controllers: [ClienteAPIController],
  exports: [ClienteGateway],
  providers: [
    // gateways
    ClienteGateway,
    // controllers
    ConsultarClientePorCPFController,
    CadastrarClienteController,
    // use cases
    CadastrarClienteUseCase,
    ConsultarClientePorCPFUseCase,
    // external repository
    {
      provide: IClienteRepository,
      useClass: ClienteRepository,
    },
    {
      provide: 'CLIENTE_REPOSITORY',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ClienteEntity),
      inject: ['DATA_SOURCE'],
    },
  ],
})
export class AppModule {}
