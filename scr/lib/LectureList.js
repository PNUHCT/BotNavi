import { getPlayList } from './DataProcessor';

const LectureList = ({ navigation, plId, lecture }) => {
    const [playList, setPlayList] = useState(null);

    const _getPlayList = async () => {
        setPlayList(await getPlayList(plId)); //여기서 API 데이터를 받아옴
    };
    useEffect(() => {
        _getPlayList();
    }, []);

    const renderVideo = ({ item: { title, img, desc, date, videoId } }) => (
        <TouchableHighlight
            onPress={() =>
                navigation.navigate('LectureVideo', {
                    videoId: videoId,
                    title: title,
                    desc: desc,
                })
            }
            underlayColor="white">
            <View style={style.container}>
                <View style={style.itemBox}>
                    <Image
                        source={{ uri: `${img}` }}
                        style={{ width: 'auto', height: 200 }}
                    />
                </View>
                <View style={style.itemTitleBox}>
                    <Text style={style.title}>{title}</Text>
                    <Text numberOfLines={1} style={style.date}>
                        {date}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    );

    const renderHeader = () => (
        <View style={style.header}>
            <Text
                style={{ fontSize: normalize(16), fontWeight: 'bold', color: '#6e6e6e' }}>
                {lecture} 강좌
            </Text>
        </View>
    );

    return !playList ? (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 20,
                flex: 1,
            }}>
            <ActivityIndicator size="large" />
        </View>
    ) : (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <SafeAreaView style={{ flex: 10 }}>
                <FlatList
                    data={playList.videoInfo}
                    renderItem={renderVideo}
                    keyExtractor={item => item.videoId}
                    ListHeaderComponent={renderHeader}
                    style={{ flex: 8 }}
                />
            </SafeAreaView>
        </View>
    );
};

//... 중략

export default LectureList;