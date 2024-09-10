class RecintosZoo {

  constructor() {
    this.recintos = [
      { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: ['MACACO'], quantidade: 3 },
      { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: [], quantidade: 0 },
      { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['GAZELA'], quantidade: 1 },
      { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: [], quantidade: 0 },
      { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: ['LEAO'], quantidade: 1 }
    ];
    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
    };
  }


  //1.2 - O programa deve receber tipo e quantidade de animal (nessa ordem)
  analisaRecintos(tipoAnimal, quantidade) {

    //4.2 - Caso animal informado seja inválido, apresentar erro "Animal inválido"
    if (!this.animais[tipoAnimal]) {
      return { erro: 'Animal inválido' };
    }

    //5.2 - Caso quantidade informada seja inválida, apresentar erro "Quantidade inválida"
    if (quantidade <= 0 || isNaN(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    const animalEnviadoInfo = this.animais[tipoAnimal];
    const recintosViaveis = [];

    this.recintos.forEach(recintoAtual => {
      console.log('-------------------------------');
      console.log(`ANALISANDO O RECINTO ${recintoAtual.numero}...`);
      console.log(`No recinto: ${recintoAtual.quantidade} ${recintoAtual.animaisExistentes}  | Enviado para o recinto: ${quantidade} ${tipoAnimal} `);

  //3 - Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)

      //1 - Um animal se sente confortável se está num bioma adequado 
      if (!animalEnviadoInfo.biomas.some(bioma => recintoAtual.bioma.includes(bioma))) {
        console.log(`Recinto não é adequado (bioma incompatível)`);
        return;
      }

      //2 - Animais carnívoros devem habitar somente com a própria espécie
      const temOutrosAnimais = recintoAtual.animaisExistentes.length > 0;
      const temCarnivorosNoRecinto = recintoAtual.animaisExistentes.some(a => this.animais[a].carnivoro);
      const carnivorosDeOutraEspecie = recintoAtual.animaisExistentes.some(a => this.animais[a].carnivoro && a !== tipoAnimal);
      console.log(`temOutrosAnimais ${temOutrosAnimais} | temCarnivorosNoRecinto ${temCarnivorosNoRecinto} | carnivorosDeOutraEspecie ${carnivorosDeOutraEspecie}`);
      
      if (animalEnviadoInfo.carnivoro) {
        if (temOutrosAnimais && carnivorosDeOutraEspecie) {
          console.log(`Recinto não é viavel (carnívoros de espécies diferentes)`);
          return;
        } else if (temOutrosAnimais && !temCarnivorosNoRecinto && !carnivorosDeOutraEspecie) {
          console.log(`Recinto não é viavel (carnívoros e um não-carnívoro)`);
          return;
        }
      } else {
        if (temCarnivorosNoRecinto) {
          console.log(`Recinto não é viavel (não-carnívoro e um carnivoro)`);
          return;
        }
      }

      //4 - Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
      if (tipoAnimal === 'HIPOPOTAMO' && !recintoAtual.animaisExistentes.includes('HIPOPOTAMO') && recintoAtual.animaisExistentes.length > 0 && !(recintoAtual.bioma.includes('savana') && recintoAtual.bioma.includes('rio'))) {
        console.log(`Recinto não é adequado (Hipopótamos só toleram outras espécies em recintos com savana e rio)`);
        return;
      }
      if (recintoAtual.animaisExistentes.includes('HIPOPOTAMO') && tipoAnimal !== 'HIPOPOTAMO' && !(recintoAtual.bioma.includes('savana') && recintoAtual.bioma.includes('rio'))) {
        console.log(`Recinto não é adequado (Hipopótamos só toleram outras espécies em recintos com savana e rio)`);
        return; 
      }

      //5 - Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
      if (tipoAnimal == 'MACACO' && recintoAtual.animaisExistentes.length < 1 && quantidade <= 1) {
        console.log(`Recinto não é adequado (macacos precisam de companhia)`);
        return;
      }

      //6 - Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
      const espacoExtra = recintoAtual.animaisExistentes.some(animal => animal !== tipoAnimal && animal != null) ? 1 : 0;

      const espacoASerOcupado = (quantidade * animalEnviadoInfo.tamanho) + espacoExtra;
      let espacoJaOcupado = 0;
        for (let i = 0; i < recintoAtual.animaisExistentes.length; i++) {
          const animal = recintoAtual.animaisExistentes[i];
          espacoJaOcupado += this.animais[animal].tamanho * recintoAtual.quantidade;
        }
      
      console.log(`Espaço total: ${recintoAtual.tamanhoTotal} | Espaço já ocupado: ${espacoJaOcupado}`);
      console.log(`Espaço que será ocupado: ${espacoASerOcupado} (+ ${espacoExtra} espaço extra)`);

      const espacoDisponivel = (recintoAtual.tamanhoTotal - espacoJaOcupado);
      const espacoLivre = (recintoAtual.tamanhoTotal - espacoJaOcupado) - espacoASerOcupado;
      console.log(`Espaço disponível: ${espacoDisponivel} | Espaço Livre: ${espacoLivre}`);

      //7 - Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto
      if (espacoDisponivel >= espacoASerOcupado) {
        //3.2 - A lista de recintos viáveis deve indicar o espaço livre que restaria após a inclusão do(s) animal(is) e o espaço total, no formato "Recinto nro (espaço livre: valorlivre total: valortotal)"
        recintosViaveis.push(`Recinto ${recintoAtual.numero} (espaço livre: ${espacoLivre} total: ${recintoAtual.tamanhoTotal})`);
        console.log(`Recinto é viável para o animal ${tipoAnimal}`);
      } else {
        console.log(`Recinto NÃO é viável para o animal ${tipoAnimal}`);
      }
    });
    console.log('-------------------------------');
    
    //6.2 - Caso não haja recinto possível, apresentar erro "Não há recinto viável"
    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: 'Não há recinto viável' };
    }
    
  }
}

const zoo = new RecintosZoo();
//2.2 - O programa deve retornar uma estrutura contendo a lista de todos os recintos viáveis ordenada pelo número do recinto (caso existam) e a mensagem de erro (caso exista)
console.log(zoo.analisaRecintos('MACACO', 2)); 

export { RecintosZoo as RecintosZoo };
