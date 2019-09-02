import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput
} from 'react-native'
import { getCategory, postCategory } from '../public/redux/actions/category'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

export class Drawer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      categories: [],
      category: '',
      category_color: '#000000',
      category_image: '',
      isModalVisible: false
    }
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  componentDidMount () {
    this.makeRequest()
    this.props.navigation.addListener('willFocus', async () => {
      this.makeRequest()
    })
  }

  makeRequest = async () => {
    await this.props.dispatch(getCategory())
    this.setState({
      categories: this.props.category.listCategory
    })
  }

  postCategory = async () => {
    let data = {
      category: this.state.category,
      category_color: this.state.category_color,
      category_image: this.state.category_image
    }
    if (
      this.state.category === '' ||
      this.state.category_color === '' ||
      this.state.category_image === ''
    ) {
      Alert.alert('Isi semua data!!!')
    } else {
      await this.props
        .dispatch(postCategory(data))
        .then(() => {
          this.toggleModal()
          this.props.navigation.toggleDrawer()
          this.props.navigation.navigate('Home')
        })
        .catch(() => {
          console.warn('error')
        })
    }
  }

  render () {
    const { categories } = this.state
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/81.jpg' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.viewProfileData}>
          <Text style={styles.txtFullname}>Shaloom Razade</Text>
        </View>
        <View style={{ marginTop: 40, marginLeft: 16 }}>
          {categories.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.props.navigation.navigate('Home')}
              >
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <Image
                    style={{ width: 20, height: 20, marginRight: 8 }}
                    source={require('../assets/writing.png')}
                  />
                  <Text
                    style={{
                      fontFamily: 'Open Sans',
                      fontSize: 17,
                      fontWeight: 'bold'
                    }}
                  >
                    {item.category}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity onPress={() => this.toggleModal()}>
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Image
                style={{ width: 20, height: 20, marginRight: 8 }}
                source={require('../assets/plus.png')}
              />
              <Text
                style={{
                  fontFamily: 'Open Sans',
                  fontSize: 17,
                  fontWeight: 'bold'
                }}
              >
                Add Category
              </Text>
            </View>
          </TouchableOpacity>
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ width: '100%', backgroundColor: 'white' }}>
              <TextInput
                style={{
                  height: 50,
                  width: '100%'
                }}
                onChangeText={category => this.setState({ category })}
                placeholder='New Category...'
              />
              <TextInput
                style={{
                  height: 50,
                  width: '100%'
                }}
                onChangeText={category_color =>
                  this.setState({ category_color })
                }
                placeholder='Category Color...'
              />
              <TextInput
                style={{
                  height: 50,
                  width: '100%'
                }}
                onChangeText={category_image =>
                  this.setState({ category_image })
                }
                placeholder='Image Url...'
              />
              <Button
                title='Add Category'
                onPress={() => this.postCategory()}
              />
              <Button
                color='red'
                title='CANCEL'
                onPress={() => this.toggleModal()}
              />
            </View>
          </Modal>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => {
  return {
    category: state.category
  }
}

export default connect(mapStateToProps)(Drawer)

const styles = StyleSheet.create({
  txtFullname: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 5
  },
  viewProfileData: {
    alignSelf: 'center'
  },
  avatar: {
    marginVertical: 25,
    alignSelf: 'center',
    width: 86,
    height: 86,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 100 / 2
  },
  background: {
    backgroundColor: '#ffffff'
  },
  imgBackground: {
    width: '100%',
    height: 180,
    opacity: 0.6
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white'
  }
})
