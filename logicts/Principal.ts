import Corrente from "./Corrente";
import Poupanca from "./Poupanca";
import Salario from "./Salario";

class Principal {
    teste: string = "";
    main(): void {
        const ccore = new Corrente();
        const cpoup = new Poupanca();
        const csalario = new Salario();

        ccore.saldo = 195.15;
        cpoup.saldo = 100;
        csalario.saldo = 150;

        ccore.depositar(50);
        cpoup.depositar(100);
        csalario.depositar(200);
    
        console .log(ccore.saldos());
        console .log(cpoup.saldos());
        console .log(csalario.saldos());
    }
}

const app = new Principal();
app.main();