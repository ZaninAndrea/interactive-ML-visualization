# Perceptron
A classifier is the simplest example of Artificial Intelligence: it takes an input classifies it. For example the input could be dirt moisture and the output be dry or moist. We can also have multiple inputs, but we still have a single output. A classifier could recognize several categories, but we will start with a binary classifier that recognizes just 2 categories.
  
We will start with this example dataset:
[randomly generated svg here]

The goal is to have our AI distinguish the red dot from the blue ones, the input will be the [x] and [y] coordinates and the output will be [1] (meaning red) or [-1] (meaning blue).

The simplest neural network is the perceptron:
[perceptron schema]
It takes every input, multiplies it by a weight and sums the results. Then the sum is passed to an activator function than transforms this number into our classification, we will use the simplest activator function: the step function 
[step function graph]
If the sum is negative than the output will be -1, otherwise it will be 1.

Let's start with some random weights: [weights here]

We can visualize our weights as a line dividing the inputs into the 2 categories, the training process it therefore the search for the perfect line to divide our points.

Unless we get really lucky the random weights make for a sloppy line: there are many points wrongly classified.
LEGENDA:
| perceptron guess | red is the correct color | blue is the correct color | 
| --- | --- | --- |
| red | full red dot |  red dot with blue border|
| blue | blue dot with red border | full blue dot| 

[scatterplot with random weights]





TODO: use colors to make variables stand out