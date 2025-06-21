import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../../app/(tabs)/telaInicial';

const { width } = Dimensions.get('screen');

// Mock data for groups
const groups = [
  { id: 1, name: 'Só os marombas 1', admin: true },
  { id: 2, name: 'Só os marombas', admin: false },
  { id: 3, name: 'Só os marombas', admin: false },
];

export default function DrawerNavigator() {
  const [token, setToken] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  // State for different modals
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    async function loadToken() {
      const storedToken = await AsyncStorage.getItem('userToken');
      setToken(storedToken);
    }
    loadToken();
  }, []);

  const openGroupOptions = (group: any) => {
    setSelectedGroup(group);
    setDrawerVisible(false);
    // Use a slight delay to make the transition feel smoother
    setTimeout(() => setOptionsVisible(true), 50);
  };
  
  const renderGroupOptions = () => {
    if (!selectedGroup) return null;

    const isAdmin = selectedGroup.admin;

    return (
      <Modal transparent={true} visible={optionsVisible} animationType="slide" onRequestClose={() => setOptionsVisible(false)}>
        <Pressable style={styles.optionsOverlay} onPress={() => setOptionsVisible(false)}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionItem} onPress={() => { setIsMuted(!isMuted); setOptionsVisible(false); }}>
              <Icon name={isMuted ? "volume-off" : "volume-high"} size={24} color="#FFF" />
              <Text style={styles.optionText}>{isMuted ? 'Desilenciar grupo' : 'Silenciar grupo'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionItem} onPress={() => { setOptionsVisible(false); setInviteModalVisible(true); }}>
              <Icon name="share-variant-outline" size={24} color="#FFF" />
              <Text style={styles.optionText}>Copiar código de grupo</Text>
            </TouchableOpacity>
            {isAdmin && (
              <TouchableOpacity style={styles.optionItem}>
                <Icon name="pencil-outline" size={24} color="#FFF" />
                <Text style={styles.optionText}>Alterar grupo e membros</Text>
              </TouchableOpacity>
            )}
            {isAdmin ? (
              <TouchableOpacity style={[styles.optionItem, {borderBottomWidth: 0}]} onPress={() => { setOptionsVisible(false); setDeleteModalVisible(true); }}>
                <Icon name="trash-can-outline" size={24} color="#FFF" />
                <Text style={styles.optionText}>Deletar grupo</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.optionItem, {borderBottomWidth: 0}]} onPress={() => { setOptionsVisible(false); setLeaveModalVisible(true); }}>
                <Icon name="exit-to-app" size={24} color="#FFF" />
                <Text style={styles.optionText}>Sair do grupo</Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Modal>
    );
  };
  
  const renderGenericModal = (visible: boolean, setVisible: (vis: boolean) => void, title: string, content: string, actionText: string, actionColor: string) => (
      <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.confirmationModalOverlay}>
          <View style={styles.confirmationModalContainer}>
            <Text style={styles.confirmationModalTitle}>{title}</Text>
            {content && <Text style={styles.confirmationModalContent}>{content}</Text>}
            <View style={styles.confirmationModalActions}>
               <TouchableOpacity style={styles.confirmationModalButtonCancel} onPress={() => setVisible(false)}>
                <Text style={styles.confirmationModalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.confirmationModalButton, {backgroundColor: actionColor}]} onPress={() => setVisible(false)}>
                <Text style={styles.confirmationModalButtonText}>{actionText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  );

  const CustomDrawer = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={drawerVisible}
      onRequestClose={() => setDrawerVisible(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setDrawerVisible(false)}>
        <Pressable style={[styles.drawerContainer, styles.drawerShadow]}>
          <View style={styles.drawerHeader}>
            <Text style={styles.drawerHeaderTitle}>Meus Grupos</Text>
          </View>
          <ScrollView>
            {groups.map(group => (
              <View key={group.id} style={styles.drawerItemContainer}>
                <TouchableOpacity style={styles.drawerItem}>
                  <View style={styles.groupIcon}><Text style={styles.groupIconText}>Pa</Text></View>
                  <Text style={styles.drawerItemText}>{group.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openGroupOptions(group)}>
                  <Icon name="dots-vertical" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
           <View style={styles.drawerFooter}>
              <TouchableOpacity style={styles.drawerFooterButton}>
                <Icon name="account-multiple-plus-outline" size={24} color="#FFF" style={styles.drawerFooterIcon} />
                <Text style={styles.drawerFooterText}>Juntar-se ao grupo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.drawerFooterButton}>
                <Icon name="plus-circle-outline" size={24} color="#FFF" style={styles.drawerFooterIcon} />
                <Text style={styles.drawerFooterText}>Criar Grupo</Text>
              </TouchableOpacity>
            </View>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen setDrawerVisible={setDrawerVisible} />
      
      {/* Modals */}
      {renderGroupOptions()}
      {renderGenericModal(leaveModalVisible, setLeaveModalVisible, "Deseja sair do grupo?", "", "Sair", "#48D1CC")}
      {renderGenericModal(deleteModalVisible, setDeleteModalVisible, "Deseja deletar o grupo?", "Essa ação não pode ser desfeita e todas as informações perdidas!", "Deletar", "#48D1CC")}
      <Modal transparent={true} visible={inviteModalVisible} animationType="fade" onRequestClose={() => setInviteModalVisible(false)}>
          <Pressable style={styles.confirmationModalOverlay} onPress={() => setInviteModalVisible(false)}>
              <View style={[styles.confirmationModalContainer, { paddingVertical: 30 }]}>
                  <Text style={[styles.confirmationModalTitle, { marginBottom: 20 }]}>Código de convite</Text>
                  <View style={styles.inviteCodeBox}>
                      <Text style={styles.inviteCodeText}>H7D398</Text>
                      <Icon name="content-copy" size={24} color="#A9A9A9" />
                  </View>
                  <TouchableOpacity style={styles.copyLinkButton}>
                      <Text style={styles.copyLinkButtonText}>Copiar link</Text>
                  </TouchableOpacity>
              </View>
          </Pressable>
      </Modal>
      <CustomDrawer />
    </View>
  );
}

const styles = StyleSheet.create({
  // Drawer Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#1f3652',
    width: width * 0.8,
    paddingTop: 40,
  },
  drawerShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#2a4d6d',
  },
  drawerHeaderTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  drawerItem: {
    paddingVertical: 12,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a4d6d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupIconText: {
    color: 'white',
    fontWeight: 'bold',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#2a4d6d',
    padding: 20,
  },
  drawerFooterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  drawerFooterIcon: {
    marginRight: 15,
  },
  drawerFooterText: {
    color: 'white',
    fontSize: 16,
  },
  // Options Menu Styles
  optionsOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    backgroundColor: '#1f3652',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom: 30, // Safe area for home indicator
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2a4d6d',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
  },
  // Confirmation Modal Styles
  confirmationModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationModalContainer: {
    width: '80%',
    backgroundColor: '#1f3652',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  confirmationModalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmationModalContent: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#A9A9A9',
  },
  confirmationModalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  confirmationModalButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 100,
  },
  confirmationModalButtonCancel: {
    backgroundColor: '#2a4d6d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 100,
  },
  confirmationModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Invite Code Modal Styles
  inviteCodeBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#1f3652',
      paddingVertical: 20,
      paddingHorizontal: 25,
      borderRadius: 10,
      marginVertical: 20,
      width: '100%',
      borderWidth: 1,
      borderColor: '#2a4d6d',
  },
  inviteCodeText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      letterSpacing: 2,
  },
  copyLinkButton: {
      backgroundColor: '#48D1CC',
      padding: 15,
      borderRadius: 8,
      width: '100%',
      alignItems: 'center',
  },
  copyLinkButtonText: {
      color: '#1f3652',
      fontWeight: 'bold',
      fontSize: 16,
  },
  });
