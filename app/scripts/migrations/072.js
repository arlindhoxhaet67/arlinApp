import { cloneDeep } from 'lodash';

const version = 72;

export default {
  version,
  async migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    versionedData.data.PreferencesController = {
      ...versionedData.data.PreferencesController,
      knownMethodData: {},
    };
    return versionedData;
  },
};
