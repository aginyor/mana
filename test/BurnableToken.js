'use strict'

const { EVMThrow } = require('./utils.js')
const BurnableTokenMock = artifacts.require('./helpers/BurnableTokenMock.sol')

const BigNumber = web3.BigNumber

contract('BurnableToken', function (accounts) {
  let token
  let expectedTokenSupply = new BigNumber(900)

  beforeEach(async function () {
    token = await BurnableTokenMock.new(accounts[1], 1000)
  })

  it('owner should be able to burn tokens', async function () {
    await token.burn(100, { from: accounts[1] })

    const balance = await token.balanceOf(accounts[1])
    balance.should.be.bignumber.equal(expectedTokenSupply)

    const totalSupply = await token.totalSupply()
    totalSupply.should.be.bignumber.equal(expectedTokenSupply)
  })

  it('cannot burn more tokens that you have', async function () {
    await token.burn(2000, { from: accounts[1] })
      .should.be.rejectedWith(EVMThrow)
  })
})