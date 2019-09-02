import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Appbar, Avatar, Searchbar, FAB } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid'
import { getNote } from '../public/redux/actions/note'
import { connect } from 'react-redux'
import moment from 'moment'

export class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      notes: [],
      firstQuery: ''
    }
  }

  componentDidMount () {
    this.makeRequest()
    this.props.navigation.addListener('willFocus', async () => {
      this.makeRequest()
    })
  }

  makeRequest = async () => {
    await this.props.dispatch(getNote())
    this.setState({
      notes: this.props.note.listNote
    })
  }

  _drawer = () => alert('Searching')

  _sort = () => alert('Shown more')

  render () {
    const { firstQuery } = this.state

    return (
      <>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <View>
          <Appbar style={{ backgroundColor: 'white', elevation: 8 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.toggleDrawer()}
            >
              <Avatar.Image
                size={35}
                source={{
                  uri: 'https://randomuser.me/api/portraits/women/81.jpg'
                }}
                style={{ marginLeft: 16 }}
              />
            </TouchableOpacity>
            <Appbar.Content
              title='NOTE APP'
              titleStyle={styles.headerTitle}
              style={{ alignItems: 'center' }}
            />
            <Appbar.Action icon='sort' onPress={this._sort} />
          </Appbar>
          <View style={styles.background}>
            <Searchbar
              placeholder='Search...'
              onChangeText={query => {
                this.setState({ firstQuery: query })
              }}
              value={firstQuery}
              style={{ width: '95%', borderRadius: 32 }}
            />
            <FlatGrid
              showsVerticalScrollIndicator={false}
              itemDimension={130}
              items={this.state.notes}
              style={styles.gridView}
              spacing={16}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    this.props.navigation.navigate('EditNote', {
                      item
                    })
                  }
                >
                  <View
                    style={[
                      styles.itemContainer,
                      { backgroundColor: item.category_color }
                    ]}
                  >
                    <View style={styles.dateView}>
                      <Text style={styles.dateStyle}>
                        {moment(item.date_make).format('ll')}
                      </Text>
                    </View>

                    <Text numberOfLines={1} style={styles.noteTitle}>
                      {item.note_title}
                    </Text>

                    <Text style={styles.category}>{item.category}</Text>

                    <Text numberOfLines={2} style={styles.note}>
                      {item.note}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <FAB
            style={styles.fab}
            icon='add'
            color='black'
            onPress={() => this.props.navigation.navigate('AddNote')}
          />
        </View>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    note: state.note
  }
}

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
  gridView: {
    marginTop: 16,
    flex: 1,
    width: '100%'
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 8,
    padding: 10,
    height: 170
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
    alignItems: 'center',
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
