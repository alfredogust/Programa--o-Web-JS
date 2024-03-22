function transporMatriz(matriz) {
    console.log("Matriz Original:");
    for (let linha of matriz) {
        console.log(linha.join(" "));
    }

    const transposta = [];
    for (let coluna = 0; coluna < matriz[0].length; coluna++) {
        const linhaTransposta = [];
        for (let linha = 0; linha < matriz.length; linha++) {
            linhaTransposta.push(matriz[linha][coluna]);
        }
        transposta.push(linhaTransposta);
    }

    console.log("\nMatriz Transposta:");
    for (let linha of transposta) {
        console.log(linha.join(" "));
    }
}

const matrizOriginal = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

transporMatriz(matrizOriginal);
