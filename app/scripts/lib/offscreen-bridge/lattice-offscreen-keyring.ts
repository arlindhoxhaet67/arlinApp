import LatticeKeyring from 'eth-lattice-keyring';
import { OffscreenCommunicationTarget, KnownOrigins } from '../../../../shared/constants/offscreen-communication';

class LatticeKeyringOffscreen extends LatticeKeyring {
  static type = LatticeKeyring.type;

  constructor(opts = {}) {
    super(opts);
  }

  async _getCreds() {
    const name = this.appName ?? 'Unknown';
    const url = `${KnownOrigins.lattice}?keyring=${name}&forceLogin=true`;

    return new Promise<{ deviceID: string; password: string; endpoint: string }>((resolve, reject) => {
      chrome.runtime.sendMessage(
        { target: OffscreenCommunicationTarget.latticeOffscreen, params: { url } },
        (response) => (response.error ? reject(response.error) : resolve(response.result)),
      );
    });
  }
}

export { LatticeKeyringOffscreen };
