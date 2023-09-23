import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { getLatestMarkdowns } from './lib/api' 
import { useEffect, useState } from 'react'

export default function App() {

  const [latest10Contents, setLatest10Contents] = useState([])

  useEffect(() => {
    (async function fetchData() {
      const latest10Contents = await getPosts()
      setLatest10Contents(latest10Contents)
    })()
  }, [])

  const renderContent = ({ item: { title = '-' } }) => {
    return <Text>{ title }</Text>
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <div>記事一覧</div>
      { latest10Contents.length > 0 &&
        <Text style={styles.title}>新着({ latest10Contents.length })件</Text>
        
      }
      <FlatList
        data={latest10Contents}
        renderItem={renderContent}
      />
    </View>
  )
}

const getPosts = async () => {
  return await getLatestMarkdowns(10)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold'
  }
})
