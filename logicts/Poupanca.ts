import Conta from './Conta'
import IContas, { ICliente } from './IConta';

export default class Poupanca extends Conta implements IContas {

    
        depositar(valor: number): number {
    
            this.saldo+= valor;
            return this.saldos() + this.deposito;
        }
        sacar(valor: number): number {
            
            this.saque = valor;
            return this.saque;
        }
        saldos(): number {
            return this.saldo;
        }
        abrirconta(cli: ICliente): void {
            this.nome = cli._nome;
            this.cpf = cli._cpf;
            this.endereco = cli._endereco;
            this.email = cli._email;
        }

    
        }