import { connect } from 'react-redux';
import {
  getAccountToConnectToActiveTab,
  getOrderedConnectedAccountsForActiveTab,
  getOriginOfCurrentTab,
  getPermissionsForActiveTab,
  getSelectedInternalAccount,
  getPermissionSubjects,
  getSubjectMetadata,
  getInternalAccounts,
} from '../../selectors';
import { isExtensionUrl } from '../../helpers/utils/util';
import {
  addPermittedAccount,
  removePermittedAccount,
  setSelectedInternalAccount,
} from '../../store/actions';
import ConnectedAccounts from './connected-accounts.component';

const mapStateToProps = (state) => ({
  accountToConnect: formatAccountWithName(
    getAccountToConnectToActiveTab(state),
    state.internalAccounts, 
  ), 
  isActiveTabExtension: isExtensionUrl(state.activeTab), 
  activeTabOrigin:  getOriginOfCurrentTab(state), 
  connectedAccounts: formatConnectedAccountsWithName(
    getOrderedConnectedAccountsForActiveTab(state), 
    state.internalAccounts),

  permissions:  getPermissionsForActiveTab(state), 

  selectedAddress:  getStateSelectedAddress(state),

  subjectMetadata:  getSubjectMetadata(state),  
  originOfActiveTab:  getOriginOfCurrentTab(state), 
  permissionSubjects:  getPermissionSubjects(state)  
 });

 const mapDispatchToProps = { 
   addPermittedAccount ,
   removePermittedAccount ,
   setSelectedInternalAccount 
 };

 
 function formatAccountWithName (account , internalAccounts) {
   if (!account) return null; 
   const formattedAccountName = internalAccounts.find(({ address }) => address === account.address)?.metadata?.name; 
   return { ...account , name : formattedAccountName }; 
 }

 function formatConnectedAccountsWithName (connected Accounts , internal Accounts ) { 
   return connected Accounts .map((account) => ({ 
     ...account , 
     name : internal Accounts .find(({ address }) => address === account .address )?.metadata?.name 
   })); 
 }
 
 export default connect (mapStateToProps , mapDispatchToProps)(ConnectedAccounts);  
