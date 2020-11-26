import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTracked} from '../../provider';
import {Actions} from '../../provider/Actions';
import {DDS} from '../../services/DeviceDetection';
import {eSendEvent, eSubscribeEvent, eUnSubscribeEvent} from '../../services/EventManager';
import Navigation from '../../services/Navigation';
import {getElevation} from '../../utils';
import {db} from '../../utils/DB';
import {refreshNotesPage} from '../../utils/Events';
import {rootNavigatorRef} from '../../utils/Refs';
import {ph, pv, SIZE} from '../../utils/SizeUtils';
import BaseDialog from '../Dialog/base-dialog';
import DialogButtons from '../Dialog/dialog-buttons';
import DialogHeader from '../Dialog/dialog-header';
import {PressableButton} from '../PressableButton';
import Heading from '../Typography/Heading';
import Paragraph from '../Typography/Paragraph';

export const TagsSection = () => {
  const [state, dispatch] = useTracked();
  const {colors, menuPins} = state;

  useEffect(() => {
    dispatch({type: Actions.MENU_PINS});
  }, []);


  const onPress = (item) => {
    let params;
    if (item.type === 'notebook') {
      params = {
        notebook: item,
        title: item.title,
        menu: true,
      };

      Navigation.navigate('Notebook', params, {
        heading: item.title,
        id: item.id,
        type: item.type,
      });
      rootNavigatorRef.current?.setParams(params);

    } else if (item.type === 'tag') {
      params = params = {
        title: item.title,
        tag: item,
        type: 'tag',
        menu: true,
      };
      Navigation.navigate('NotesPage', params, {
        heading: '#' + item.title,
        id: item.id,
        type: item.type,
      });
      eSendEvent(refreshNotesPage, params);
    } else {
      params = {...item, menu: true};
      Navigation.navigate('NotesPage', params, {
        heading: item.title,
        id: item.id,
        type: item.type,
      });
      eSendEvent(refreshNotesPage, params);
    }

    Navigation.closeDrawer();
  };

  return (
    <View
      style={{
        flexGrow: 1,
      }}>
      <FlatList
        data={menuPins}
        style={{
          flexGrow: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: '10%',
            }}>
            <Heading style={{marginBottom: 2.5}} size={SIZE.sm}>
              Your Pins
            </Heading>
            <Paragraph
              style={{textAlign: 'center'}}
              color={colors.icon}
              size={SIZE.xs}>
              You have not pinned anything yet. You can pin topics and tags
              here.
            </Paragraph>
          </View>
        }
        keyExtractor={(item, index) => item.id}
        renderItem={({item, index}) => (
          <PinItem item={item} index={index} onPress={onPress} />
        )}
      />
    </View>
  );
};

const PinItem = ({item, index, onPress}) => {
  const [state, dispatch] = useTracked();
  const {colors} = state;
  const [visible, setVisible] = useState(false);
  const [headerTextState, setHeaderTextState] = useState(null);



  const onHeaderStateChange = (event) => {
    if (event?.id === item.name) {
      setHeaderTextState(event);
    } else {
      setHeaderTextState(null);
    }
  };

  useEffect(() => {
    eSubscribeEvent('onHeaderStateChange', onHeaderStateChange);
    return () => {
      eUnSubscribeEvent('onHeaderStateChange', onHeaderStateChange);
    };
  }, []);
  return (
    <>
      {visible && (
        <BaseDialog visible={true}>
          <View
            style={{
              ...getElevation(5),
              width: DDS.isTab ? 350 : '80%',
              maxHeight: 350,
              borderRadius: 5,
              backgroundColor: colors.bg,
              paddingHorizontal: ph,
              paddingVertical: pv,
            }}>
            <DialogHeader title="Unpin" paragraph="Remove item from menu" />
            <DialogButtons
              positiveTitle="Unpin"
              negativeTitle="Cancel"
              onPressNegative={() => setVisible(false)}
              onPressPositive={async () => {
                await db.settings.unpin(note.id);
                dispatch({type: Actions.MENU_PINS});
              }}
            />
          </View>
        </BaseDialog>
      )}
      <PressableButton
        color={
          headerTextState?.id === item.id && headerTextState?.type === item.type
            ? colors.shade
            : 'transparent'
        }
        selectedColor={colors.accent}
        alpha={!colors.night ? -0.02 : 0.02}
        opacity={0.12}
        onLongPress={() => setVisible(true)}
        onPress={() => onPress(item)}
        customStyle={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          borderRadius: 0,
          paddingHorizontal: 10,
          minHeight: 50,
        }}>
        <View
          style={{
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          {item.type === 'notebook' ? (
            <Icon color={colors.accent} size={SIZE.md} name="book-outline" />
          ) : item.type === 'tag' ? (
            <Icon color={colors.accent} size={SIZE.md} name="pound" />
          ) : (
            <Paragraph
              style={{textAlign: 'center', width: 12}}
              color={colors.accent}
              size={SIZE.md}>
              T
            </Paragraph>
          )}
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            width: '85%',
          }}>
          <Paragraph size={SIZE.md} color={colors.heading}>
            {item.title}
          </Paragraph>

          <Paragraph
            style={{marginTop: 2.5}}
            size={SIZE.xs}
            color={colors.icon}>
            {item.type.slice(0, 1).toUpperCase() +
              item.type.slice(1, item.type.length)}{' '}
            {item.type === 'topic'
              ? 'in ' + db.notebooks.notebook(item.notebookId).data.title
              : null}
          </Paragraph>
        </View>
      </PressableButton>
    </>
  );
};

/* 

  {tags
        .filter((o) => o.noteIds.length > 1)
        .slice(0, tags.length > 10 ? 10 : tags.length)
        .map((item) => (
          <PressableButton
            key={item.id}
            color={
              currentScreen === item.title.toLowerCase()
                ? colors.shade
                : 'transparent'
            }
            selectedColor={colors.accent}
            alpha={!colors.night ? -0.02 : 0.02}
            opacity={0.12}
            onPress={() => onPress(item)}
            customStyle={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              borderRadius: 0,
              paddingHorizontal: 10,
              height: 50,
            }}>
            <View
              style={{
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Paragraph color={colors.accent} size={SIZE.md}>
                #
              </Paragraph>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '85%',
              }}>
              <Paragraph color={colors.heading}>{item.title}</Paragraph>

            </View>
          </PressableButton>
        ))}
*/
