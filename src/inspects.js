exports.privateKeyToPublicKey = function (privateKey) {
    var elliptic = require("elliptic");
    var secp256k1 = new elliptic.ec("secp256k1");
    var web3 = require("web3");

    let buffer = Buffer.from(privateKey.slice(2), "hex");

    let ecKey = secp256k1.keyFromPrivate(buffer);
    let publicKey = "0x" + ecKey.getPublic(false, 'hex').slice(2);
    let address = "0x" + web3.utils.keccak256(publicKey).slice(-40);

    const ethers = require('ethers');
    const wallet = new ethers.Wallet(privateKey);

    return {
        publicKey: wallet.signingKey.keyPair.publicKey || publicKey,
        compressedPublicKey: wallet.signingKey.keyPair.compressedPublicKey,
        address: wallet.signingKey.address || address
    };
}

