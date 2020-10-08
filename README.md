# react-native-counter
Counter component for React Native with speed scroll feature.

## The tricky part

The trickiest part is with speed scroll implementation.

The thing is that when user taps and holds the button, we start to constantly update the value, and if we also constantly update the value outside the component (using provided callback) - it may lead to a funny "Cannot update a component from inside the function body of a different component" warning. There is a long discussion about that issue on react's github. I suppose it is somehow related to the fact that I'm calling that callback from within another callback which is called by a timeout. That's why I decided to avoid doing that, and instead I call `onChange` when user finishes speed scroll (`onPressOut`).

Another tricky part is that when `onPressOut` comes, and if we rely on `value` from state, then we make a mistake, because `value` from state is updated asynchronously, and due to very fast scroll speed it may be not up-to-date. We have to use a ref here. Like in any callback, basically (that's a common best practice).

## The bottom line.

It was a funny excercise. When thinking about the best demo, I decided to go for a trading one. Quotes for forex currencies usually have many digits after the period, and also stop loss cannot be higher than some margin below take profit. I thought that would be a good example of why NumericInput should care about dynamic min/max values, and also speed scroll is quite handy here.
