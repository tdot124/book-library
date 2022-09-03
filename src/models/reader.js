module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: "Please enter your name",
                },
                notEmpty: {
                    args:[true],
                    msg: "Please enter your name",
                },
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: "Please enter an email address",
                },
                notEmpty: {
                    args:[true],
                    msg: "Please enter an email address",
                },
                isEmail: {
                    args:[true],
                    msg: "Please enter a valid email address",
                },            
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: "Please enter a password",
                },
                notEmpty: {
                    args:[true],
                    msg: "Please enter a password",
                },
                len: {
                    args: [8,64],
                    msg: "Your password must be more than 8 characters long"
                },
            },
        },
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
};