(function (window, undefined) {
    require([
        'Doraemon/Doraemon',
        'IO/IO',
        'Social/Social',
        'Device/Device'
    ], function (
        Doraemon,
        IO,
        Social,
        Device
    ) {
        console.log('OneRing is now ruling Narya ...');

        var root = window;

        var Narya = {
            Doraemon : Doraemon,
            IO : IO,
            Social : Social,
            Device : Device
        };

        root.Narya = root.SnapPea = Narya;

        return Narya;
    });
}(this));
