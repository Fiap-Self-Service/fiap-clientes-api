Funcionalidade: Buscar Cliente por ID

Cenário: Buscar Cliente cadastrado por ID
  Dado que seja informado um ID já cadastrado
  Quando realizado a busca do cliente por ID
  Então os dados do cliente cadastrado devem ser retornados

Cenário: Buscar Cliente cadastrado por ID não cadastrado
  Dado que seja informado um ID não cadastrado
  Quando realizado a busca do cliente por ID
  Então uma exceção informando que o cliente não foi encontrado deve ser lançada