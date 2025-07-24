// const wrapAsyncs=(fn)=>{
//     return (req,res,next)=>{
//         fn(req,res,next).catch(next)

//     };

// };

// module.exports= wrapAsyncs;

module.exports = function wrapAsyncs (fn) {
  return function (req, res, next) {
    const result = fn(req, res, next);
    if (result && typeof result.catch === 'function') {
      result.catch(next);
    } else {
      // If not a Promise, just continue
      next();
    }
  };
};