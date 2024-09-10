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


  analisaRecintos(tipoAnimal, quantidade) {

    if (!this.animais[tipoAnimal]) {
      return { erro: 'Animal inválido' };
    }

    if (quantidade <= 0 || isNaN(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    const animalEnviadoInfo = this.animais[tipoAnimal];
    const recintosViaveis = [];

    this.recintos.sort((a, b) => a.numero - b.numero);

    this.recintos.forEach(recintoAtual => {

      if (!animalEnviadoInfo.biomas.some(bioma => recintoAtual.bioma.includes(bioma))) {
        return;
      }

      const temOutrosAnimais = recintoAtual.animaisExistentes.length > 0;
      const temCarnivorosNoRecinto = recintoAtual.animaisExistentes.some(a => this.animais[a].carnivoro);
      const carnivorosDeOutraEspecie = recintoAtual.animaisExistentes.some(a => this.animais[a].carnivoro && a !== tipoAnimal);
      
      if (animalEnviadoInfo.carnivoro) {
        if (temOutrosAnimais && carnivorosDeOutraEspecie) {
          return;
        } else if (temOutrosAnimais && !temCarnivorosNoRecinto && !carnivorosDeOutraEspecie) {
          return;
        }
      } else {
        if (temCarnivorosNoRecinto) {
          return;
        }
      }

      if (tipoAnimal === 'HIPOPOTAMO' && !recintoAtual.animaisExistentes.includes('HIPOPOTAMO') && recintoAtual.animaisExistentes.length > 0 && !(recintoAtual.bioma.includes('savana') && recintoAtual.bioma.includes('rio'))) {
        return;
      }
      if (recintoAtual.animaisExistentes.includes('HIPOPOTAMO') && tipoAnimal !== 'HIPOPOTAMO' && !(recintoAtual.bioma.includes('savana') && recintoAtual.bioma.includes('rio'))) {
        return; 
      }

      if (tipoAnimal == 'MACACO' && recintoAtual.animaisExistentes.length < 1 && quantidade <= 1) {
        return;
      }

      const espacoExtra = recintoAtual.animaisExistentes.some(animal => animal !== tipoAnimal && animal != null) ? 1 : 0;

      const espacoASerOcupado = (quantidade * animalEnviadoInfo.tamanho) + espacoExtra;
      let espacoJaOcupado = 0;
        for (let i = 0; i < recintoAtual.animaisExistentes.length; i++) {
          const animal = recintoAtual.animaisExistentes[i];
          espacoJaOcupado += this.animais[animal].tamanho * recintoAtual.quantidade;
        }

      const espacoDisponivel = (recintoAtual.tamanhoTotal - espacoJaOcupado);
      const espacoLivre = (recintoAtual.tamanhoTotal - espacoJaOcupado) - espacoASerOcupado;

      if (espacoDisponivel >= espacoASerOcupado) {
        recintosViaveis.push(`Recinto ${recintoAtual.numero} (espaço livre: ${espacoLivre} total: ${recintoAtual.tamanhoTotal})`);
      }
    });

    if (recintosViaveis.length > 0) {
      console.log({recintosViaveis: recintosViaveis});
      return { recintosViaveis: recintosViaveis };
    } else {
      return { erro: 'Não há recinto viável' };
    }

  }
}

//new RecintosZoo().analisaRecintos('MACACO', 2);

export { RecintosZoo as RecintosZoo };
