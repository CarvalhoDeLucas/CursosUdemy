function a() {
    console.log('Executa a()');
}

function b() {
    console.log('Executa b()');
}

function c() {
    console.log('Executa c()');
    a();
    b();
}

c(); 