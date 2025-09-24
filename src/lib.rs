#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
#![cfg_attr(not(any(test, feature = "export-abi")), no_std)]

mod base64;
mod generator;

#[macro_use]
extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;

use alloy_sol_types::SolValue;
use openzeppelin_stylus::token::erc721::{self, Erc721};
/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{
    alloy_primitives::{FixedBytes, U256},
    crypto::keccak,
    prelude::*,
};

// Define some persistent storage using the Solidity ABI.
// Glyphs will be the entrypoint.
sol_storage! {
    #[entrypoint]
    pub struct Glyphs {
        #[borrow]
        Erc721 erc721;

        uint256 total_supply;
        mapping(uint256 => bytes32) seeds;
    }
}


#[derive(SolidityError)]
pub enum GlyphError {
    InvalidOwner(erc721::ERC721InvalidOwner),
    NonexistentToken(erc721::ERC721NonexistentToken),
    IncorrectOwner(erc721::ERC721IncorrectOwner),
    InvalidSender(erc721::ERC721InvalidSender),
    InvalidReceiver(erc721::ERC721InvalidReceiver),
    InvalidReceiverWithReason(erc721::InvalidReceiverWithReason),
    InsufficientApproval(erc721::ERC721InsufficientApproval),
    InvalidApprover(erc721::ERC721InvalidApprover),
    InvalidOperator(erc721::ERC721InvalidOperator),
}

impl From<erc721::Error> for GlyphError {
    fn from(value: erc721::Error) -> Self {
        match value {
            erc721::Error::InvalidOwner(e) => GlyphError::InvalidOwner(e),
            erc721::Error::NonexistentToken(e) => GlyphError::NonexistentToken(e),
            erc721::Error::IncorrectOwner(e) => GlyphError::IncorrectOwner(e),
            erc721::Error::InvalidSender(e) => GlyphError::InvalidSender(e),
            erc721::Error::InvalidReceiver(e) => GlyphError::InvalidReceiver(e),
            erc721::Error::InvalidReceiverWithReason(e) => GlyphError::InvalidReceiverWithReason(e),
            erc721::Error::InsufficientApproval(e) => GlyphError::InsufficientApproval(e),
            erc721::Error::InvalidApprover(e) => GlyphError::InvalidApprover(e),
            erc721::Error::InvalidOperator(e) => GlyphError::InvalidOperator(e),
        }
    }
}

impl Glyphs {
    fn generate_seed(&self) -> FixedBytes<32> {
        let block_number = self.vm().block_number();
        let msg_sender = self.vm().msg_sender();
        let chain_id = self.vm().chain_id();
        let hash_data = (block_number, msg_sender, chain_id).abi_encode_sequence();

        keccak(&hash_data)
    }
}

/// Declare that `Glyphs` is a contract with the following external methods.
#[public]
#[inherit(Erc721)]
impl Glyphs {

    fn name(&self) -> String {
        String::from("Glyphs")
    }

    fn symbol(&self) -> String {
        String::from("GLYPH")
    }

    #[selector(name = "tokenURI")]
    fn token_uri(&self, token_id: U256) -> Result<String, GlyphError> {
        let seed = self.seeds.get(token_id);
        let generator = generator::GlyphGenerator::new(seed);
        let metadata = generator.metadata();

        Ok(metadata)
    }

    #[payable]
    fn mint(&mut self) -> Result<(), GlyphError> {
        let minter = self.vm().msg_sender();

        // Generate a random seed
        let seed = self.generate_seed();

        // Update the total supply and set the seed in storage for this Token ID
        let token_id = self.total_supply.get();
        self.seeds.setter(token_id).set(seed);
        self.total_supply.set(token_id + U256::ONE);

        // Mint the actual token to the user via Erc721
        self.erc721._mint(minter, token_id)?;

        Ok(())
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[no_mangle]
    pub unsafe extern "C" fn emit_log(_pointer: *const u8, _len: usize, _: usize) {}

    #[test]
    fn test_glyphs() {
        use stylus_sdk::testing::*;
        let vm = TestVM::default();
        let mut contract = Glyphs::from(&vm);

        let result = contract.mint();
        assert!(result.is_err());

        let total_supply = contract.total_supply.get();
        assert_eq!(total_supply, U256::from(1));

        let token_uri = contract.token_uri(U256::from(0));
        assert!(token_uri.is_ok());
    }
}
