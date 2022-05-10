const Token = artifacts.require("./MyToken.sol");

const chai = require('chai');
const BN = web3.utils.BN;
const chaiBn = require('chai-bn')(BN);
chai.use(chaiBn)

var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised)

const expect = chai.expect;


contract('Token Test', async(accounts) => {

    const [deployerAccount, recepient, anotherAccount] = accounts

    beforeEach(() => {
        // this.MyToken = await Token.deployed()
    })

    it('All tokens should be in my account', async ()=> {
        let instance =   await Token.deployed()
        let totalSupply = await instance.totalSupply();
        let num = instance.balanceOf(accounts[0])
        // let inS = await instance.balanceOf(deployerAccount)
  
        expect(num).to.eventually.be.a.bignumber.equal(totalSupply)
    })

    it('Is possible to send tokens between account', async ()=> {
        let sendTokens = 1;
        let instance = await Token.deployed()
        let totalSupply = await instance.totalSupply();
  
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
        expect(instance.transfer(recepient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
        expect(instance.balanceOf(recepient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));

    })

    it('Is not possible to send tokens then are already available in total', async ()=> {
        let instance = await Token.deployed()
        let balanceOfDeployer = await instance.balanceOf(accounts[0])
        expect(instance.transfer(recepient, new BN(balanceOfDeployer+1))).to.eventually.be.rejected;

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(balanceOfDeployer))

    })  

 


    // it('Should transfer tokens to the mytoken sale address account', async ()=> {
    //     let instance = await Token.deployed()
    //     let myTokenInstance = await MyTokenSale.deployed()

    //     let totalSupply = await instance.totalSupply();
  
    //     expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply)
    //     expect(instance.transfer(recepient, totalSupply)).to.eventually.be.fulfilled;
    //     expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
    //     expect(instance.balanceOf(recepient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));

    // })







})
