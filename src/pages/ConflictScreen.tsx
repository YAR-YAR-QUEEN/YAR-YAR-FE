import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { FactionAvatar } from '../components/FactionAvatar';
import { FactionName } from '../constants';

const CONFLICT_BACKGROUND = require('../assets/background/conflict/conflict.png');
const FACTION_ASSETS: Record<FactionName, ImageSourcePropType> = {
  [FactionName.Regent]: require('../assets/character/daewongun.png'),
  [FactionName.Reformer]: require('../assets/character/hwanghoo.png'),
};

interface ConflictScreenProps {
  regentAuthority: number;
  reformerAuthority: number;
}

export function ConflictScreen({
  regentAuthority,
  reformerAuthority,
}: ConflictScreenProps) {
  const totalAuthority = regentAuthority + reformerAuthority;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={CONFLICT_BACKGROUND}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.characterLayer}>
          <View style={[styles.characterSlot, styles.leftSlot]}>
            <FactionAvatar
              assetPath={FACTION_ASSETS[FactionName.Regent]}
              authority={regentAuthority}
              totalAuthority={totalAuthority}
            />
          </View>

          <View style={[styles.characterSlot, styles.rightSlot]}>
            <FactionAvatar
              assetPath={FACTION_ASSETS[FactionName.Reformer]}
              authority={reformerAuthority}
              totalAuthority={totalAuthority}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  characterLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  characterSlot: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: '100%',
  },
  leftSlot: {
    left: 0,
  },
  rightSlot: {
    right: 0,
  },
});
