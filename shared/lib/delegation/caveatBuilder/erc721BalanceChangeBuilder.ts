import { Hex, bytesToHex } from '@arlinapp/utils';
import { encodePacked } from '@arlinapp/abi-utils';
import { DeleGatorEnvironment } from '../environment';
import { Caveat } from '../caveat';
import { isAddress } from '../utils';

export const erc721BalanceChange = 'erc721BalanceChange';

export function erc721BalanceChangeBuilder(
  environment: DeleGatorEnvironment,
  enforceDecrease: boolean,
  token: Hex,
  recipient: Hex,
  amount: bigint
): Caveat {
  if (typeof enforceDecrease !== 'boolean') throw new Error('Invalid enforceDecrease');
  if (!isAddress(token, { strict: false })) throw new Error('Invalid token');
  if (!isAddress(recipient, { strict: false })) throw new Error('Invalid recipient');
  if (typeof amount !== 'bigint' || amount < 0) throw new Error('Invalid amount');

  const terms = bytesToHex(encodePacked(['bool', 'address', 'address', 'uint256'], [enforceDecrease, token, recipient, amount]));

  const enforcer = environment.caveatEnforcers.ERC721BalanceChangeEnforcer;

 return {
    enforcer,
    terms,
    args: '0x'
 };
}
