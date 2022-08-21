/**
 * @author arijit
 * these code running on the open chrome tab v8 engine
 * whatever variable declare here can be access only in this runtime environment
 */

export const pickColor = async () => {
  try {
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    return {
      status: true,
      result,
    };
  } catch (err) {
    console.warn(err);
    return {
      status: false,
      result: null,
    };
  }
};
