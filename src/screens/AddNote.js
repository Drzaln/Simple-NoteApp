import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Picker
} from 'react-native'
import { Appbar } from 'react-native-paper'
import { getCategory } from '../public/redux/actions/category'
import { postNote } from '../public/redux/actions/note'
import { connect } from 'react-redux'

export class AddNote extends Component {
  constructor (props) {
    super(props)
    this.state = { title: '', description: '', category: 1, categories: [] }
  }
  onValueChange (value) {
    this.setState({
      category: value
    })
  }

  componentDidMount () {
    this.makeRequest()
  }

  makeRequest = async () => {
    await this.props.dispatch(getCategory())
    this.setState({
      categories: this.props.category.listCategory
    })
  }

  postNote = async () => {
    let data = {
      note_title: this.state.title,
      note: this.state.description,
      id_category: this.state.category
    }
    if (this.state.title === '' || this.state.description === '') {
      Alert.alert('Isi semua data!!!')
    } else {
      await this.props
        .dispatch(postNote(data))
        .then(() => {
          this.props.navigation.navigate('Home')
        })
        .catch(() => {
          console.warn('error')
        })
    }
  }

  render () {
    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Appbar style={{ backgroundColor: 'white', elevation: 8 }}>
            <Appbar.BackAction
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Appbar.Content
              title='ADD NOTE'
              titleStyle={styles.headerTitle}
              style={{ alignItems: 'center' }}
            />
            <Appbar.Action
              icon='check-circle'
              onPress={() => this.postNote()}
              color='#3DB39E'
            />
          </Appbar>
          <View style={styles.background}>
            <TextInput
              style={{
                height: 50,
                width: '100%'
              }}
              onChangeText={title => this.setState({ title })}
              placeholder='ADD TITLE...'
            />
            <TextInput
              style={{
                height: 100,
                width: '100%'
              }}
              onChangeText={description => this.setState({ description })}
              placeholder='ADD DESCRIPTION...'
              multiline
              numberOfLines={5}
            />
            <Picker
              note
              mode='dropdown'
              style={{ width: '100%' }}
              selectedValue={this.state.category}
              onValueChange={this.onValueChange.bind(this)}
            >
              {this.state.categories.map((item, key) => {
                return (
                  <Picker.Item
                    key={key}
                    label={item.category}
                    value={item.id_category}
                  />
                )
              })}
            </Picker>
          </View>
        </View>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    category: state.category
  }
}

export default connect(mapStateToProps)(AddNote)

const styles = StyleSheet.create({
  gridView: {
    marginTop: 16,
    flex: 1,
    width: '100%'
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: 10
  },
  headerTitle: {
    fontFamily: 'Open Sans',
    fontSize: 15,
    fontWeight: 'bold'
  },
  background: {
    height: '90%',
    padding: 16,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    marginTop: 16
  },
  dateView: { alignItems: 'flex-end' },
  dateStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Open Sans',
    fontSize: 16
  },
  noteTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    fontFamily: 'Open Sans'
  },
  category: {
    color: 'white',
    fontFamily: 'Open Sans',
    fontSize: 17,
    marginBottom: 16
  },
  note: { color: 'white', fontSize: 18 },
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 32,
    right: 0,
    bottom: 0,
    backgroundColor: 'white'
  }
})
