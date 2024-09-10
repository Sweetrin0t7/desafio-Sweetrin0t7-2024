import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 1 leopardo', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 1 macaco sem outro animal no recinto', () => {
        const zoo = new RecintosZoo();
        zoo.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: [], quantidade: 0 },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: [], quantidade: 0 },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: [], quantidade: 0 },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: [], quantidade: 0 },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: [], quantidade: 0 }
        ];
        const resultado = zoo.analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para outro animal com 1 hipopótamo no recinto sem ser savana e rio', () => {
        const zoo = new RecintosZoo();
        zoo.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: ['HIPOPOTAMO'], quantidade: 1 },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: ['HIPOPOTAMO'], quantidade: 1 },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['HIPOPOTAMO'], quantidade: 1 },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: ['HIPOPOTAMO'], quantidade: 1 },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: ['HIPOPOTAMO'], quantidade: 1 }
        ];
        
        const resultado = zoo.analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Não deve encontrar recintos para um hipopótamo com outra espécie no recinto sem ser savana e rio', () => {
        const zoo = new RecintosZoo();
        zoo.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: ['MACACO'], quantidade: 1 },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: ['MACACO'], quantidade: 1 },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['MACACO'], quantidade: 1 },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: ['MACACO'], quantidade: 1 },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: ['MACACO'], quantidade: 1 }
        ];
        
        const resultado = zoo.analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Não deve encontrar recinto para qualquer não-carnívoro em recintos com carnívoros', () => {
        const zoo = new RecintosZoo();
        zoo.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: ['CROCODILO'], quantidade: 1 },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: ['LEAO'], quantidade: 1 },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['LEOPARDO'], quantidade: 1 },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: ['CROCODILO'], quantidade: 1 },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: ['LEAO'], quantidade: 1 }
        ];
        
        const naoCarnivoros = ['GAZELA', 'MACACO','HIPOPOTAMO']
        naoCarnivoros.forEach(naoCarnivoro=> {
        const resultado = zoo.analisaRecintos(naoCarnivoro, 1);

        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
        });
    });

    test('Não deve encontrar recinto para qualquer carnívoro em recinto de não-carnívoros', () => {
        const zoo = new RecintosZoo();
        zoo.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: ['GAZELA'], quantidade: 1 },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: ['MACACO'], quantidade: 1 },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['GAZELA'], quantidade: 1 },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: ['MACACO'], quantidade: 1 },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: ['GAZELA'], quantidade: 1 }
        ];
        
        const carnivoros = ['CROCODILO', 'LEAO','LEOPARDO']
        carnivoros.forEach(carnivoro => {
        const resultado = zoo.analisaRecintos(carnivoro, 1);

        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
        });

    });

    test('Deve rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recintos para um leão com outro leao', () => {
        const zoo = new RecintosZoo();
        zoo.recintos = [
            { numero: 1, bioma: ['savana'], tamanhoTotal: 10, animaisExistentes: ['LEOPARDO'], quantidade: 1 },
            { numero: 2, bioma: ['floresta'], tamanhoTotal: 5, animaisExistentes: ['LEOPARDO'], quantidade: 1 },
            { numero: 3, bioma: ['savana', 'rio'], tamanhoTotal: 7, animaisExistentes: ['LEAO'], quantidade: 1 },
            { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: ['CROCODILO'], quantidade: 1 },
            { numero: 5, bioma: ['savana'], tamanhoTotal: 9, animaisExistentes: ['CROCODILO'], quantidade: 1 }
        ];
        
        const resultado = zoo.analisaRecintos('LEAO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });
    
    test('Deve encontrar recinto para 1 gazela', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 4 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recinto para 1 hipopotamo', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Deve encontrar recintos para 1 macaco', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 6 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 3 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

});

