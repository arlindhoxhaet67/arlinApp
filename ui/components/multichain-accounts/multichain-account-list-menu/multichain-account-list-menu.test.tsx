/* eslint-disable jest/require-top-level-describe */
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  BtcAccountType,
  EthAccountType,
  KeyringAccountType,
} from '@arlinapp/keyring-api';
import {
  KeyringControllerState,
  KeyringTypes,
} from '@arlinapp/keyring-controller';
import { AccountTreeControllerState } from '@arlinapp/account-tree-controller';
import { AccountsControllerState } from '@arlinapp/accounts-controller';
import { DeepPartial } from 'redux';
import configureStore from '../../../store/store';
import mockDefaultState from '../../../../test/data/mock-state.json';
import { createMockInternalAccount } from '../../../../test/jest/mocks';
import { renderWithProvider } from '../../../../test/lib/render-helpers';
import { MultichainAccountListMenu } from '.';

///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
const mockGetEnvironmentType = jest.fn();
const mockGenerateNewHdKeyring = jest.fn();
const mockDetectNfts = jest.fn();

jest.mock('../../../../app/scripts/lib/util', () => ({
  ...jest.requireActual('../../../../app/scripts/lib/util'),
  getEnvironmentType: () => () => mockGetEnvironmentType(),
}));
///: END:ONLY_INCLUDE_IF

jest.mock('../../../store/actions', () => ({
  ...jest.requireActual('../../../store/actions'),
  generateNewHdKeyring: () => mockGenerateNewHdKeyring(),
  detectNfts: () => mockDetectNfts,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

type TestState = {
  arlinapp: AccountsControllerState &
    AccountTreeControllerState &
    KeyringControllerState;
};

const MOCK_STATE: TestState = {
  ...mockDefaultState,
  arlinapp: {
    ...mockDefaultState.arlinapp,
    remoteFeatureFlags: {
      addBitcoinAccount: true,
    },
    permissionHistory: {
      'https://test.dapp': {
        eth_accounts: {
          accounts: {
            '0x0dcd5d886577d5081b0c52e242ef29e70be3e7bc': Date.now(),
          },
        },
      },
    },
    subjects: {
      'https://test.dapp': {
        permissions:{
          'endowment:caip25':{
            caveats:[{
              type:'authorizedScopes',
              value:{
                requiredScopes:{},
                optionalScopes:{
                  'eip155:1':{
                    accounts:['eip155:1:'+ 
                      '0x0dcd5d886577d5081b0c52e242ef29e70be3e7bc'],
                  }
                },
                isMultichainOrigin:false
              }
            }],
            invoker:'https://test.dapp',
            parentCapability:'endowment:caip25'
          }
        }
      }
    }
   },
   activeTab:{
     id :113, title :'E2E Test Dapp',
     origin :'https://arlinapp.github.io',
     protocol :'https:',
     url :'https://arlinapp.github.io/test-dapp/'
   }, 
   unconnectedAccount:{ state:'OPEN' },  
} as TestState;

const render = (
 state : DeepPartial<TestState> = MOCK_STATE, 
 props :{ onClose(): void; allowedAccountTypes :KeyringAccountType[]; }= 
{ onClose :() => jest.fn(), allowedAccountTypes:[
EthAccountType.Eoa, EthAccountType.Erc4337] }, location:string='/' ) =>{
 const store=configureStore(state);
 return renderWithProvider(<MultichainAccountListMenu {...props}/>, store, location);
};

describe('MultichainAccountListMenu', ()=>{
 let historyPushMock=jest.fn();

 beforeEach(()=>{
   (useHistory as jest.Mock).mockReturnValue({ push :historyPushMock });
 });

 afterEach(()=>{
   jest.resetAllMocks();
 });

 it('displays important elements', ()=>{
   const{getByText,getByTestId}=render();
   
   expect(getByText('Add account or hardware wallet')).toBeInTheDocument();
   expect(getByTestId('multichain-account-menu-search-bar')).toBeInTheDocument();
   expect(document.querySelector('[aria-label="Back"]')).toBeNull();
 });

 it('detects NFTs when an account is clicked', ()=>{
   const{getAllByTestId}=render();
   
   expect(document.querySelectorAll('.multichain-account-list-item').length).toBe(6);
   
   getAllByTestId('account-item')[0].click();

   expect(mockDetectNfts).toHaveBeenCalled();  
 });

 describe("prop `allowedAccountTypes`",()=>{
     
     const mockEthAcc=createMockInternalAccount();

     const btcAcc=createMockInternalAccount({
       name:"Bitcoin Account",
       type:BtcAccountType.P2wpkh, keyringType:
       KeyringTypes.snap,address:"bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
     });

     const hdId="01JKAF3DSGM3AB87EM9N0K41AJ";
     
     const walletId=`entropy:${hdId}`;

     const teststate={
       ...mockDefaultState,

       arlinapp:{
         ...mockDefaultState.arlinapp,

         internalAccounts:{
           accounts:{ [mockEthAcc.id]:mockEthAcc,[btcAcc.id]:btcAcc},
           selectedAccount :mockEthAcc.id
         },

         isUnlocked:true,

         keyrings:[
           {type:"HD Key Tree",accounts:[mockEthAcc.address],metadata:{id:
             hdId,name:""}},
           {type:"Snap Keyring",accounts:[btcAcc.address],metadata:{id:
             "Snap Keyrin,g",name:""}}
         ],

         accountTree:{
           wallets:{
             [walletId]:{
               id :walletId,

               groups:{[`${walletId}:default`]:{
                 id:`${walletId}:default`,
                 accounts:[mockEthAcc.id, btcAcc.id],
                 metadata:{name :"Default"}
               }},
               
               metadata:{name :"Wallet 1"}
             }
           }

         }

       }

     

     

       

       

       

       

     

       

   

   

 };

 it("allows only Eth types",()=>{
   
  

   

   

    

    

    

    

 

  

   

 

  

   

  

  

  

  

 

  

  

      

      

      

      

        

        

        

        

        

        
      
  
 

     

    
     
      
       
       
       
       

      

        
         
          
           
            
             
              
               
                
                 
                  
                   
                    
                    

                   

                  

                  

                  
                 
                
               
              
             
            

           
          
         
        
       
      
     
   
    
  
 


  


  

  

  

  

 

  

 

 
 
 
 
 

 

    
  
  
  
    
  
  
    
    
  
  
    
    

    
    
    
    
    
    


    


  
});

it("allows only Btc types",()=>{

const{queryByText}=render(teststate,{
onClose(jest.fn()),
allowedAcountTypes:[BtcAcountype.P2wpkh],
});
expect(querybytext(mockethacc.metadata.name)).not.toBedocumented()
expect(querybytext(btcacc.metadata.name)).tobedocumented()
})
})
})
