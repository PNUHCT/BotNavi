import { AntDesign } from '@expo/vector-icons';
import { View, Text, Pressable, ToastAndroid } from 'react-native';

const [favorite, setFavorite] = useState();

//Toast Android
const showToastMessage = (msg) => {
    ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
    );
};


const addFav = () => {
    setFavorite(!favorite);
    axios.get(url)
        .then((response) => {
            if (response.data == 1) {
                showToastMessage("좋아요 삭제");
            } else {
                showToastMessage("좋아요");
            }
        })
}

return (
    <View>
        {favorite ?
            <Pressable onPress={() => addFav()}>
                <AntDesign name="heart" size={30} color="#eb4b4b" />
            </Pressable>
            :
            <Pressable onPress={() => addFav()}>
                <AntDesign name="hearto" size={30} color="#999" />
            </Pressable>
        }
    </View>
)