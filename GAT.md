### Spatial  Methods:

1. transform;(linear projection)
2. aggregate;(attention)
3. update



### Part one: Understanding your data

*inductive , transductive ？*

#### 1. load:

(1) topology — edge_index;

(2) node_lables;

(3) node_features;

(4) train, val, test_indices;

#### 2. feature normalization on Cora: (necessary)

#### 3. analyze the shapes and the type (int 64 type)

#### 4. visualizing your data



### Part two: Understanding GAT's inner workings

#### 1. Define GAT and GATLayer

##### GATLayer:

###### forward:

Step 1 : Linear Projection + regularization;

Step 2 : Edge attention calculation;

Step 3 : Neighborhood aggregation;

Step 4 : Residual/skip connection, concat and bias.



### Part three : Training GAT

Step 1 : load the graph data;

Step 2 : prepare the model;

Step 3 : Prepare other training related utilities;

Step 4 : Start the training procedure;

Step 5 : test the model;















 