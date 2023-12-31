import React, {useState} from 'react';
import { View, ScrollView, Button, Text, StyleSheet, TouchableHighlight} from 'react-native';
import CartCard from '../components/CartCard';
import OrderCard from '../components/OrderCard';


const CartScreen = (props) => {
    const {cartItems, onAdd, onRemove, checkOut} = props;
    const [orderNotComplete, setOrder] = useState(true)

  
    console.log("CART ITEMS IN CART", cartItems)
    let total = 0
    let tax = 0;
    let finalTotal = 0

    const calculateTotal = () =>{
        for(let i = 0; i < cartItems.length; i++){
            total = cartItems[i].quantity * cartItems[i].item.price + total
            tax = total * .075
            finalTotal = total + tax
        } 
    }

   

    const completeOrder = () =>{
        setOrder(false)
    }
  
    return(
         orderNotComplete ?
            (
            <View style={Styles.container}>
                <ScrollView>
            {calculateTotal()}
            {cartItems.length === 0 && <Text style={Styles.empty}>cart is empty</Text>}
            {cartItems.map((product) => {
                return(
            <CartCard
            key={product.item._id + product.size}
            product={product}
            img={product.item.img}
            onAdd={onAdd}
            onRemove={onRemove}
            />
                )
             }
            )}
            
            {total !== 0 &&  
            <View>
                <View style={Styles.checkOutBox}>
            <Text style={Styles.checkOutText}>${total.toFixed(2)} </Text>
            <Text style={Styles.checkOutText}>Tax ${tax.toFixed(2)}</Text>
            <Text style={Styles.checkOutText}>Total:${finalTotal.toFixed(2)}</Text>
            </View>
             
        {cartItems.length !== 0 && 
        <View style={Styles.btnContainer}>
        <TouchableHighlight 
        onPress={() => {checkOut();completeOrder()}}
                  style ={{ 
                      height: 50,
                      width:140,
                      borderRadius:10,
                      backgroundColor : "black",
                      opacity:.9,
                      marginLeft :50,
                      marginRight:50,
                      marginTop :20
                  }}>
                    <Text style={Styles.btnText}>Check Out</Text></TouchableHighlight>
                    </View>}
                   
        </View>
                    
}    
        </ScrollView>
       
        </View>
        )
        : (<OrderCard/>
        ) 


)}

const Styles = StyleSheet.create({
    container :{
        margin:15,
        paddingTop:40
        
        
    },
    checkOutText:{
        textAlign:'right'
    },
    checkOutBox:{
        paddingRight:50
    },
    empty:{
        textAlign:'center',
        paddingTop:50,
        fontSize:20
    },
    btnContainer : {
        alignItems: 'center'
    },
    btnText :{
        textAlign:'center',
        color:'white',
        fontSize:20,
        paddingTop:12


    },
    titleText:{
        textAlign:'center',
        paddingBottom:6
    },
    image:{
        alignSelf:'center',
        width:200,
        height:210
    },
    checkoutBtn:{
        
    }
})

export default CartScreen;