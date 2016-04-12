

  All the classes that are abstract and can be accessed from other scss files will live here.
  A good example of an abstract class is bellow :

   .#{$namespace}font-size-md,
   %#{$namespace}font-size-md {
     font-size: $font-size-medium;
   }

   This class then can be extended , or included in any other place or can be used directly in the html markup .

