import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico - Validação de Regras', () => {

    test('Rejeitar animal inválido', () => {
        const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Rejeitar quantidade inválida', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Espécies carnívoras diferentes', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Hipopótamos só toleram outras espécies em savanas com rio', () => {
        const resultado = new RecintosZoo().analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Macaco não deve se sentir confortável sozinho', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Macacos devem se sentir confortáveis quando em pares ou mais', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 4 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Quando há mais de uma espécie no recinto, deve ser considerado 1 espaço extra ocupado', () => {
        const resultado = new RecintosZoo().analisaRecintos('GAZELA', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 4 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(2);
    });

    test('Não deve separar lotes de animais em diferentes recintos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Encontrar recinto para 1 crocodilo no rio', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

});
